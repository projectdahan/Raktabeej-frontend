const form = document.getElementById('donorForm');
const donorList = document.getElementById('donorList');
let donors = JSON.parse(localStorage.getItem('donors')) || [];

// Save donor on form submission
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const bloodGroup = document.getElementById('bloodGroup').value;
  const location = document.getElementById('location').value;

  const newDonor = { name, bloodGroup, location };
  donors.push(newDonor);

  localStorage.setItem('donors', JSON.stringify(donors));

  displayDonors();
  form.reset();
});

// Display donors with optional filters
function displayDonors(filterGroup = '', filterLocation = '') {
  donorList.innerHTML = '';

  const filteredDonors = donors.filter(donor => {
    return (
      (filterGroup === '' || donor.bloodGroup.toLowerCase() === filterGroup.toLowerCase()) &&
      (filterLocation === '' || donor.location.toLowerCase().includes(filterLocation.toLowerCase()))
    );
  });

  if (filteredDonors.length === 0) {
    donorList.textContent = 'No donors found.';
    return;
  }

  filteredDonors.forEach(donor => {
    const donorItem = document.createElement('p');
    donorItem.textContent = `${donor.name} (${donor.bloodGroup}) - ${donor.location}`;
    donorList.appendChild(donorItem);
  });
}

// Filter button function
function searchDonors() {
  const group = document.getElementById('searchGroup').value;
  const location = document.getElementById('searchLocation').value;
  displayDonors(group, location);
}

// Initial load
displayDonors();
