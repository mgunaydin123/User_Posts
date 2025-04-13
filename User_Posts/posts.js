(async () => {
  try {
      const userId = prompt("Lütfen hangi kullanıcının gönderilerini görmek istediğinizi girin (1-10):");

      if (!userId) {
          throw new Error("Kullanıcı ID'si girilmedi.");
      }

      const userIdNumber = parseInt(userId);

      if (isNaN(userIdNumber) || userIdNumber < 1 || userIdNumber > 10) {
          alert("Geçersiz kullanıcı ID! Lütfen 1 ile 10 arasında bir sayı girin.");
          throw new Error("Geçersiz kullanıcı ID.");
      }

      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userIdNumber}`);
      const posts = await response.json();

      const postCardsContainer = document.getElementById('post-cards-container');
      postCardsContainer.innerHTML = ''; // Önceki gönderileri temizle

      if (posts.length === 0) {
          postCardsContainer.innerHTML = `<p>Kullanıcı ID ${userIdNumber} için gönderi bulunamadı.</p>`;
      } else {
          posts.forEach(post => {
              const card = document.createElement('div');
              card.classList.add('post-card');

              const postTitle = `<h3 class="post-title">${post.title}</h3>`;
              const postBody = `<p class="post-body"><strong>Başlık:</strong> ${post.title}<br><strong>İçerik:</strong> ${post.body}</p>`;

              card.innerHTML = postTitle + postBody;
              postCardsContainer.appendChild(card);
          });
      }

  } catch (error) {
      console.error("Gönderiler çekilirken bir hata oluştu:", error);
      const postCardsContainer = document.getElementById('post-cards-container');
      postCardsContainer.innerHTML = `<p style="color: red;">Gönderi verileri yüklenirken bir hata oluştu: ${error.message}</p>`;
  }
})();