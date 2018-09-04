//lib文件夹是会用的函数库

const mongodb = require("mongodb");
const bcrypt = require("bcrypt");
// 加载mongo的组件
const MongoClient = mongodb.MongoClient;
//数据库配置
const dbConfig = {
    dbStr: "mongodb://localhost:27017/",
    db: "test",
    collection: "user",
    saltLevel: 10,//生成盐迭代次数
}

class User {
    constructor(obj) {
        for (let key in obj) {
            this[key] = obj[key];
        }
    }
    //数据库连接方法
    dbConnect() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(dbConfig.dbStr, { useNewUrlParser: true }, (err, db) => {
                if (err) reject(err);
                let dbo = db.db(dbConfig.db);
                let collection = dbo.collection(dbConfig.collection);
                return resolve({ collection, db });//建议在resolve之前添加return,防止resolve后面代码执行，后面的代码应当放在then之中
            })
        })
    }
    //user使用bcrypt生成盐和哈希加密
    hashPassword() {
        return new Promise((resolve, reject) => {
            //异步方法
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    reject(err);
                }
                this.salt = salt;//保存盐
                //异步方法
                bcrypt.hash(this.password, salt, (err, hash) => {
                    if (err) reject(err);
                    this.password = hash;//保存hash
                    return resolve({
                        mas: 'hash实例成功',
                        done: true
                    });
                })
            })
        })
    }

    // 用户注册方法
    async register() {
        const { collection, db } = await this.dbConnect();
        const result = await new Promise((resolve, reject) => {
            collection.find({ account: this.account }).toArray((err, result) => {
                if (err) reject(err);
                return resolve(result);
            })
        })
        if (result.length === 0) {
            await this.hashPassword();
            await new Promise((resolve, reject) => {
                collection.insertOne(this, (err, result) => {
                    if (err) reject(err);
                    db.close();//关闭数据库
                    return resolve();
                })
            })
            return {
                msg: '注册成功',
                done: true,
                data: result
            };
        } else {
            return {
                msg: '已存在用户账号',
                done: false
            };
        }
    }
    //登陆认证方法
    async authenticate() {
        const { collection, db } = await this.dbConnect();
        //查找有无此账号
        const result = await new Promise((resolve, reject) => {
            collection.find({ account: this.account }).toArray((err, result) => {
                if (err) reject(err);
                db.close();//关闭数据库
                return resolve(result);
            })
        })
        if (result.length == 0) {
            return {
                msg: '账号或密码不正确',
                done: false
            };
        }
        const hash = await new Promise((resolve, reject) => {
            bcrypt.hash(this.password, result[0].salt, (err, hash) => {
                if (err) reject(err);
                return resolve(hash);
            })
        })
        if (hash == result[0].password) {
            return {
                msg: '登陆成功',
                done: true,
                data: result
            };
        } else {
            return {
                msg: '账号或密码不正确',
                done: false
            };
        }
    }
};

module.exports = User;
