function onSubmit(e) {
  e.preventDefault();

  document.querySelector('.msg').textContent='';
document.querySelector('#image').src='';

  // getting data from the form
  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;

  if (prompt === "") {
    alert("Please enter the prompt");
    return;
  }

  // for generating image
  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {

    try {
        showSpinner();

        const  response = await fetch('/openai/generateimage',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                prompt,
                size
            })
        });

        // as in fetch api error is not automatically fetch in it so handle it separately      
        if(!response.ok){
           removeSpinner();
           throw new Error('That image could be Generated');
        }

        const data = await response.json();
        const imageUrl =data.data;
        
        document.querySelector('#image').src= imageUrl;

        removeSpinner();

    } catch (error) {
        document.querySelector('.msg').textContent = error;
    }


}

function showSpinner() {
    // for targetting an css element use (.) operator
    // class List add an class show in Spinner
    document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
    // for targetting an css element use (.) operator
    document.querySelector('.spinner').classList.remove('show');
}


document.querySelector("#image-form").addEventListener("submit", onSubmit);
