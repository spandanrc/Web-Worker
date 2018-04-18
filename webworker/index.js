var worker;
var innerHtml="";
function startWorker() {
    if(typeof(Worker) !== "undefined") {
        if(typeof(worker) == "undefined") {
            worker = new Worker("worker.js");
        }
        worker.onmessage = function(event) {
		document.getElementById("result").style.display = "block";
		document.getElementById("btnSec").innerHTML = '<button onclick="stopWorker()">Reset</button>';
		innerHtml = "<p> <b> <u> RESULT </u> </b></p><table><tr><th>ID</th><th>User Id</th><th>Title</th><th>Body</th></tr> <tbody>"
			for(let i = 0 ; i< event.data.length; ++i){
			innerHtml += "<tr> <td>"+ event.data[i].id+"</td> <td>"+ event.data[i].userId+"</td> <td>"+ event.data[i].title+"</td> <td>"+ event.data[i].body+"</td> </tr>"
			//document.getElementById("result").innerHTML +=  event.data[i].title;
			}
			innerHtml += "</tbody></table>"
			document.getElementById("result").innerHTML = innerHtml;
           
        };
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Workers...";
    }
}

function stopWorker() { 
    worker.terminate();
    worker = undefined;
	document.getElementById("result").style.display = "none";
	document.getElementById("result").innerHTML ="";
	document.getElementById("btnSec").innerHTML = '<button onclick="startWorker()">Fetch Data</button>';
}
