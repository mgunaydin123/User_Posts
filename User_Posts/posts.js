document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('postsContainer');
    const backToUsersButton = document.getElementById('backToUsers');
  
    const getUserIdFromUrl = () => new URLSearchParams(window.location.search).get('userId');
  
    const validateUserId = (userId) => {
      const parsedId = parseInt(userId);
      return !isNaN(parsedId) && parsedId >= 1 && parsedId <= 10;
    };
  
    const displayErrorMessage = (message) => {
      postsContainer.innerHTML = `<p class="text-danger">${message}</p>`;
    };
  
    const fetchPosts = async (userId) => {
      const apiUrl = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const posts = await response.json();
        if (posts.length === 0) {
          postsContainer.innerHTML = '<p>Bu kullanıcıya ait gönderi bulunamadı.</p>';
          return;
        }
        displayPosts(posts);
      } catch (error) {
        console.error('Gönderileri alırken bir hata oluştu:', error);
        displayErrorMessage('Gönderileri alırken bir hata oluştu.');
      }
    };
  
    const displayPosts = (posts) => {
      postsContainer.innerHTML = ''; // Önceki gönderileri temizle
      posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.classList.add('col');
        postCard.innerHTML = `
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.body}</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">Post ID: ${post.id}</small>
            </div>
          </div>
        `;
        postsContainer.appendChild(postCard);
      });
    };
  
    backToUsersButton.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  
    const userIdFromUrl = getUserIdFromUrl();
    let currentUserId;
  
    if (userIdFromUrl) {
      if (validateUserId(userIdFromUrl)) {
        currentUserId = parseInt(userIdFromUrl);
        fetchPosts(currentUserId);
      } else {
        alert('Geçersiz kullanıcı ID. Lütfen 1 ile 10 arasında bir ID girin.');
        window.location.href = 'index.html';
      }
    } else {
      const promptedUserId = prompt('Lütfen bir kullanıcı ID (1-10) girin:');
      if (promptedUserId) {
        if (validateUserId(promptedUserId)) {
          currentUserId = parseInt(promptedUserId);
          fetchPosts(currentUserId);
        } else {
          alert('Geçersiz kullanıcı ID. Lütfen 1 ile 10 arasında bir ID girin.');
          window.location.href = 'index.html';
        }
      } else {
        alert('Kullanıcı ID girmediniz.');
        window.location.href = 'index.html';
      }
    }
  });