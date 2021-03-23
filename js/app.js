
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
    const email = document.getElementById('email').value;
    
    const data = {
        names: names,
        phoneNumber: telephone,
        password: password,
        email: email
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

function actionDeleteUser(userid) {
    fetch('http://carwash.eu-4.evennode.com/api/user?' + new URLSearchParams({userid: userid}), {
        method: 'DELETE',
    })
    .then((res) => res.json())
    .then((data) => {
        alert(data.message);
        window.location.href='../user.html';
    })
}

function actionDeleteReport(plateno) {
    console.log(plateno)
    fetch('http://carwash.eu-4.evennode.com/api/report?' + new URLSearchParams({plateno: plateno}), {
        method: 'DELETE',
    })
    .then((res) => res.json())
    .then((data) => {
        alert(data.message);
        window.location.href='../report.html';
    })
}

function actionDeleteService(serviceid) {
    console.log(serviceid)
    fetch('http://carwash.eu-4.evennode.com/api/service?' + new URLSearchParams({serviceid: serviceid}), {
        method: 'DELETE',
    })
    .then((res) => res.json())
    .then((data) => {
        alert(data.message);
        window.location.href='../service.html';
    })
}

function btnPrintReport() { 
            const tableContents = document.getElementById("tReport").innerHTML;
            const fromDate = document.getElementById("fromDate").value;
            const toDate = document.getElementById("toDate").value;
    
            const a = window.open('', '', 'height=500, width=500'); 
            a.document.write('<html><link rel="stylesheet" href="./styles/styles.css">'); 
            a.document.write(`<body > <h1>Car Wash Report</h1><h4>This is the report from ${fromDate} to ${toDate}</h4>`); 
            a.document.write(tableContents); 
            a.document.write('</body></html>'); 
            a.document.close(); 
            a.print(); 
}

function getReportsByDate(){
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;

    axios.get(`http://carwash.eu-4.evennode.com/api/reportdate?fromDate=${fromDate}&toDate=${toDate}`)
    .then((res) => {
        let tableData = "";
                        res.data.results.forEach(obj => {
                               return tableData = tableData + `<tr><td>${obj.plate_no}</td>
                                                                   <td>${obj.car_mark}</td>
                                                                   <td>${obj.status}</td>
                                                                   <td>${obj.cleaner_name}</td>
                                                                   <td><button onclick="actionDeleteReport('${obj.plate_no}')" style="background:darkred; border-radius: 2px; padding: 8px; border: 0; color: white; cursor: pointer;"><i class="fas fa-trash-alt icon trash-icon"></i></button></td>   
                                                                </tr>`   
                            });
                        const tableBody = document.getElementById('tableBody');
                        tableBody.innerHTML = tableData;
    })
}
