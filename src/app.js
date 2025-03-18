import { signIn, getUser, signOut } from './auth';
import { getUserFragments, createNewFragment, getUserFragmentsExpanded } from './api';

async function init() {
  // Get UI elements
  const userSectionElement = document.querySelector('#user'); // Updated variable name
  const loginButton = document.querySelector('#login'); // Updated variable name
  const logoutButton = document.querySelector('#logout'); // Updated variable name
  const fragmentsListElement = document.getElementById('fragmentsList'); // Updated variable name
  const fragmentCreationForm = document.getElementById('createForm'); // Updated variable name
  const fragmentTypeSelector = document.getElementById('fragmentType'); // Updated variable name
  const fragmentContentTextarea = document.getElementById('fragmentContent'); // Updated variable name

  // Wire up event handlers to deal with login and logout
  loginButton.onclick = () => signIn();
  logoutButton.onclick = () => {signOut(); location.reload();};

  // Check if the user is logged in
  const user = await getUser();
  if (!user) {
    logoutButton.disabled = true;
    return;
  }

  // Fetch and display user fragments
  const userFragments = await getUserFragments(user);
  console.log('User fragments:', userFragments);

  // Update the UI to welcome the user
  userSectionElement.hidden = false;
  userSectionElement.querySelector('.username').innerText = user.username;
  loginButton.disabled = true;

  // Handle fragment creation
  fragmentCreationForm.onsubmit = async (event) => {
    event.preventDefault(); // Prevent page refresh

    const fragmentContent = fragmentContentTextarea.value;
    const contentType = fragmentTypeSelector.value;

    console.log('Submitting new fragment:', { contentType, fragmentContent });

    try {
      const newFragment = await createNewFragment(user, fragmentContent, contentType);
      console.log('New Fragment Created:', newFragment);

      // Refresh user fragments
      const updatedFragments = await getUserFragments(user);
      console.log('Updated Fragments:', updatedFragments);

      // Update UI with new fragments
      displayFragments(updatedFragments);

      // Reset form
      fragmentContentTextarea.value = '';
      fragmentTypeSelector.selectedIndex = 0;
    } catch (error) {
      console.error('Error creating fragment:', error.message);
      alert('Failed to create fragment. Please try again.');
    }
  };

  // Create a button to fetch metadata
  const fetchMetadataButton = document.createElement('button');
  fetchMetadataButton.textContent = 'Fetch Metadata';
  fetchMetadataButton.addEventListener('click', async () => {
    try {
      const fragments = await getUserFragmentsExpanded(user);
      console.log('User fragments with metadata:', fragments);
      // Display the fragments metadata in the UI (you can customize this part)
      const metadataContainer = document.getElementById('metadata-container');
      metadataContainer.innerHTML = JSON.stringify(fragments, null, 2);
    } catch (err) {
      console.error('Failed to fetch fragments metadata:', err);
    }
  });

  // Add the button to the DOM
  document.body.appendChild(fetchMetadataButton);

  // Create a container to display the metadata
  const metadataContainer = document.createElement('div');
  metadataContainer.id = 'metadata-container';
  document.body.appendChild(metadataContainer);
}

/**
 * Display fragments in the UI
 */
function displayFragments(fragments) {
  if (!Array.isArray(fragments)) {
    console.error("Fragments data is not an array:", fragments);
    return;
  }

  const fragmentsListElement = document.getElementById('fragmentsList'); // Updated variable name
  fragmentsListElement.innerHTML = '';

  if (fragments.length === 0) {
    fragmentsListElement.innerHTML = '<p>No fragments found.</p>';
    return;
  }

  fragments.forEach((fragment) => {
    const listItem = document.createElement('li');
    listItem.innerText = `${fragment}`;
    fragmentsListElement.appendChild(listItem);
  });
}

// Wait for the DOM to be ready, then start the app
addEventListener('DOMContentLoaded', init);