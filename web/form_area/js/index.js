/***********************
原生ajax提交表单
***********************/
var getData = function(formId) {
	return {
		account: formId["account"].value,
		password: formId["password"].value
	}
}
var logIn_2 = function() {
	var xmlhttp;
	if(window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else { // code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//用事件监听来达成回调
			console.log(xmlhttp.responseText);
		}
	}
	xmlhttp.open("POST", "login", true);
	xmlhttp.setRequestHeader("Content-type", "application/json");
	xmlhttp.send(JSON.stringify(getData(document.forms["form_2"])));
}
var register_2 = function() {
	var xmlhttp;
	if(window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else { // code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//用事件监听来达成回调
			console.log(xmlhttp.responseText);
		}
	}
	xmlhttp.open("POST", "register", true);
	xmlhttp.setRequestHeader("Content-type", "application/json");
	xmlhttp.send(JSON.stringify(getData(document.forms["form_2"])));
}
/***********************
jQuery实现提交登陆
***********************/
var logIn_3 = function() {
	$.ajax({
		type: "post",
		url: "/login",
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		async: true,
		data: $('#form_3').serialize(),
		success: function(data, textStatus, jqXHR) {
			console.log(data, textStatus);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log({
				msg: '出错了',
				done: false
			}, textStatus);
		}
	});
}
var register_3 = function() {
	$.ajax({
		type: "post",
		url: "/register",
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		async: true,
		data: $('#form_3').serialize(),
		success: function(data, textStatus, jqXHR) {
			console.log(data, textStatus);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log({
				msg: '出错了',
				done: false
			}, textStatus);
		}
	});
}

/***********************
fetch实现提交登陆
***********************/
var logIn_5 = function() {
	fetch('login', {
		method: 'post',
		headers: new Headers({
			'Content-Type': 'application/x-www-form-urlencoded' // 指定提交方式为表单提交
		}),
		// body: new FormData(document.getElementById('form_5')) aabbaa
		body: $('#form_5').serialize()
	}).then(response => {
		return response.json();
	}).then(dataJson => {
		console.log(dataJson);
	})
}
var register_5 = function() {
	fetch('register', {
		method: 'post',
		headers: new Headers({
			'Content-Type': 'application/x-www-form-urlencoded' // 指定提交方式为表单提交
		}),
		body: $('#form_5').serialize() //可以单独扒一个把对象序列化的函数 而不用引入jq
	}).then(response => {
		return response.json();
	}).then(dataJson => {
		console.log(dataJson);
	})
}