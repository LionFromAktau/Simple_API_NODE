
let selectedElement = 'all';

generateOptions();
function storeSelectedElement() {
    const selectElement = document.getElementById('personID');
    const selectedIndex = selectElement.selectedIndex;
    selectedElement = selectElement.options[selectedIndex].value;
}


async function getPerson() {
    const response = await fetch(`/get/` + selectedElement + '/'); // Replace with your API endpoint for GET request
    const data = await response.json();
    showData(data);
}

function showData(data){
    const selectElement = document.getElementById('show');
    selectElement.innerHTML = JSON.stringify(data).replace(',', '\n');
}

async function generateOptions() {
    const selectElement = document.getElementById('personID');
    selectElement.options.length = 1;
    const responce = await fetch(`/get/all/`);
    const persons = await responce.json()

    persons.forEach(person => {
        const option = document.createElement('option');
        option.value = person._id;
        option.text = person.name + " " + person.surname;
        selectElement.appendChild(option);
    });
    }



async function createPerson() {
    const jsonInput = document.getElementById('jsonInput').value;
    try{
        console.log(jsonInput)
        const response = await fetch('/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: jsonInput
            });
        const data = await response.json();
        generateOptions();
        showData(data);
    }catch(error){
        showData({"Invalid JSON format": error});
    }   
    
}

async function updatePerson() {
    const jsonInput = document.getElementById('jsonInput').value;
  
    try {
      const response = await fetch('/put/' + selectedElement + '/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: jsonInput // Convert jsonData to a string
      });
      generateOptions();
      const data = await response.json();
      showData(data);
    } catch (error) {
      showData({"Invalid JSON format": error});
    }
  }



async function deletePerson() {
    const response = await fetch('/delete/' + selectedElement + '/', { method: 'DELETE' });
    data = await response.json()
    generateOptions()
    showData(data)
}