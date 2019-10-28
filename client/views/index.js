let joinText = document.getElementById('joinText');
let joinButton = document.getElementById('joinButton');

joinButton.addEventListener('click', joinRoom);

function joinRoom(){
   location.href = '/meetingRoom/#' + joinText.value;
}