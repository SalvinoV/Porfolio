// Collapsible
var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
	coll[i].addEventListener("click", function () {
		this.classList.toggle("active");

		var content = this.nextElementSibling;

		if (content.style.maxHeight) {
			content.style.maxHeight = null;
		} else {
			content.style.maxHeight = content.scrollHeight + "px";
		}
	});
} // this is the id of the form for the chat

function getTime() {
	let today = new Date();
	hours = today.getHours();
	minutes = today.getMinutes();

	if (hours < 10) {
		hours = "0" + hours;
	}

	if (minutes < 10) {
		minutes = "0" + minutes;
	}

	let time = hours + ":" + minutes;
	return time;
	// return today;
}
// Gets the first message
function firstBotMessage() {
	let firstMessage = "Hello there, how can i help you?<br>Ask me someting :)";
	document.getElementById("botStarterMessage").innerHTML =
		'<p class="botText"><span>' + firstMessage + "</span></p>";

	let time = getTime();

	$("#chat-timestamp").append(time);
	document.getElementById("userInput").scrollIntoView(false);
}

firstBotMessage();

function displayChoices() {
	let choices = [
		"Who are you?",
		"See Github profile",
		"Contact Salvino",
		"Play?",
	];
	choices.forEach((e) => {
		let botHtml = '<p class="botQuestion"><span>' + e + "</span></p>";
		$("#chatbox").append(botHtml);
	});

	document.querySelectorAll(".botQuestion").forEach((question, index) => {
		question.addEventListener("click", function () {
			// getAutoResponse(index);
			let botHtml =
				'<span class="botTextPopUp"><p class="botText"><span>' +
				getAutoResponse(index) +
				"</span></p></span>";
			$("#chatbox").append(botHtml);

			// document.getElementById("chat-bar-bottom").scrollIntoView(true);
			scrollBottom();
		});
	});
}

//
displayChoices();

// animateDots();
//reponse si tu click
function getAutoResponse(input) {
	if (input == 0) {
		return "Me? I'm Mango, made by Salvino. How can I help?";
	} else if (input == 1) {
		return "<a target='_blank' href='https://github.com/SalvinoV'>Sure! look at this.";
	} else if (input == 2) {
		return "<a target='_blank' href='https://www.linkedin.com/in/salvino-varciat-22ab9b255/'>Sure! Click on this link</a>";
	} else if (input == 3) {
		return "Get ready to loose!";
	}
}

// Retrieves the response
//need a dot animation function when the bot is thinking

function getHardResponse(userText) {
	let botResponse = getBotResponse(userText);
	// let botHtml = '<p class="botText"><span >' + botResponse + "</span></p>";
	let botHtml = '<p class="botText"><span >' + botResponse + "</span></p>";
	$("#chatbox").append(botHtml);

	// document.getElementById("chat-bar-bottom").scrollIntoView(true);
	scrollBottom();
}

//Gets the text text from the input box and processes it
function getResponse() {
	let userText = $("#textInput").val();
	if (userText) {
		// if (userText == "") {
		// 	userText = "Say something :)";
		// }

		let userHtml = '<p class="userText"><span>' + userText + "</span></p>";

		$("#textInput").val("");
		$("#chatbox").append(userHtml);
		// document.getElementById("chat-bar-bottom").scrollIntoView(true);
		scrollBottom();
		// avant response appeler fonction pour afficher les dots
		animateDots();
		setTimeout(() => {
			// remove dots
			document.querySelector(".loader").remove();
			getHardResponse(userText);
		}, 1000);
	}
}

// afficher les dots
function animateDots() {
	let dots =
		'<div class="loader"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>';
	$("#chatbox").append(dots);
	scrollBottom();
}

// Handles sending text via button clicks
function buttonSendText(sampleText) {
	let userHtml = '<p class="userText"><span>' + sampleText + "</span></p>";

	$("#textInput").val("");
	$("#chatbox").append(userHtml);
	// document.getElementById("chat-bar-bottom").scrollIntoView(true);
	scrollBottom();

	//Uncomment this if you want the bot to respond to this buttonSendText event
	// setTimeout(() => {
	//     getHardResponse(sampleText);
	// }, 1000)
}

function sendButton() {
	getResponse();
}

function heartButton() {
	buttonSendText("Heart clicked!");
}
function scrollBottom() {
	let chatBottom = document.getElementById("chatbox");
	chatBottom.scrollTop = chatBottom.scrollHeight;
}

// Press enter to send a message
$("#textInput").keypress(function (e) {
	if (e.which == 13) {
		getResponse();
	}
});
