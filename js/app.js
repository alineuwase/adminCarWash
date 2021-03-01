
function goToAddService() {
    window.location.href='../addService.html';
}

function goToAddReport() {
    window.location.href='../addReport.html';
}

function goToLogin(){
    window.location.href='../login.html';
}

function goToAddUserAdmin() {
    window.location.href='../addUserAdmin.html';
}
function actionLogin(){
    const telephone = document.getElementById('tel').value;
    const password = document.getElementById('password').value;
    const data = {
        phoneNumber: telephone,
        password: password
    }
    fetch('http://carwash.eu-4.evennode.com/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((res) => {
        if(res.status == 401){
            return alert('Wrong credentials')
        };

        console.log('Success', res);
        localStorage.setItem('token', res.token);
        const token = localStorage.getItem('token')
        const dat = JSON.parse(atob(token.split('.')[1]));
        console.log(dat);
        if (dat.user.user_type === 'admin'){
            window.location.href = './service.html';
        }else{
            alert('You are not authorized');
        }

    })
}

function actionLogout() {
    localStorage.removeItem('token');
    window.location.href='./login.html';
}

function actionAddService(){
    const serviceName = document.getElementById('serviceName').value;
    const price = document.getElementById('price').value;
    const data = {
        serviceName: serviceName,
        price: price
    }

    fetch('http://carwash.eu-4.evennode.com/api/service',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((res => res.json()))
    .then((data) => {
        alert(data.message);
        window.location.href='../service.html'
    })
}

function actionAddReport() {
    const carId = document.getElementById('carId').value;
    const carMark = document.getElementById('carMark').value;
    const carStatus = document.getElementById('carStatus').value;
    const washerName = document.getElementById('washerName').value;
    const today = new Date();
    const date = today.getUTCFullYear() + '-' + (today.getUTCMonth()+1) + '-' + today.getDate();
    const data = {
        date: date.toString(),
        plateNo: carId,
        carMark: carMark,
        cleanerName: washerName,
        status: carStatus
    }
    
    fetch('http://carwash.eu-4.evennode.com/api/report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((res => res.json()))
    .then((data) => {
        alert(data.message);
        window.location.href='../report.html'
    })
}

function actionAddAdmin() {
    const names = document.getElementById('names').value;
    const telephone = document.getElementById('telephone').value;
    const password = document.getElementById('password').value;

    const data = {
        names: names,
        phoneNumber: telephone,
        password: password
    }
    fetch('http://carwash.eu-4.evennode.com/api/admin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((data) => {
        alert(data.message);
        window.location.href='../user.html';
    })
}