// 用react来写表单//
class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
		this.logIn = this.logIn.bind(this);
	}
	render() {
		return(
			<div>
                <div className="note">
                    <h5>form_4</h5>
                    使用React实现表单提交
		    </div>
                <form action={"login"} method={"POST"} name={"form_4"} id={"form_4"}>
                    <input type={"text"} name={"account"} className={"account"} />
                    <input type={"password"} name={"password"} className={"password"} />
                    <button type="button" className="registerBtn" onClick={this.register_2}>注册</button>
                    <button type={"button"} className={"submitBtn"} onClick={this.logIn}>提交</button>
                </form>
            </div>
		)
	}
	/*********************
	 * 
	 * 在react中不使用jq.ajax。应该选择fetch
	 * 
	 ********************/
	logIn() {
		$.ajax({
			url: 'login',
			type: 'post',
			data: $('#form_4').serialize(),
			error: function() {
				console.log({
					msg: '出错了',
					done: false
				});
			},
			success: function(data) {
				console.log(data);
			}
		});
	}
	register() {
		$.ajax({
			url: 'register',
			type: 'post',
			data: $('#form_4').serialize(),
			error: function() {
				console.log({
					msg: '出错了',
					done: false
				});
			},
			success: function(data) {
				console.log(data);
			}
		});
	}
}

ReactDOM.render(
	<Form />,
	document.getElementById('reactRoot')
);