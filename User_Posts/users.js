(async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const allUsers = await response.json(); // Tüm kullanıcıları sakla

        const userCardsContainer = document.getElementById('user-cards-container');

        const displayUsers = (usersToDisplay) => {
            userCardsContainer.innerHTML = ''; // Önceki kartları temizle
            usersToDisplay.forEach(user => {
                const card = document.createElement('div');
                card.classList.add('user-card');
                card.dataset.userId = user.id; // Kartın ID'sini sakla (isteğe bağlı)

                const basicInfoDiv = document.createElement('div');
                basicInfoDiv.classList.add('card-section');
                basicInfoDiv.innerHTML = `
                    <h3 class="section-title"><i class="fa fa-user"></i> Temel Bilgiler</h3>
                    <p class="user-id-element"><strong>ID:</strong> ${user.id}</p>
                    <p><strong>Adı:</strong> ${user.name}</p>
                    <p><strong>Kullanıcı Adı:</strong> ${user.username}</p>
                `;
                card.appendChild(basicInfoDiv);

                const toggleButton = document.createElement('button');
                toggleButton.textContent = 'Daha Fazla Göster';
                toggleButton.classList.add('toggle-button');
                card.appendChild(toggleButton);

                const addressInfoDiv = document.createElement('div');
                addressInfoDiv.classList.add('card-section', 'address-info', 'toggle-section');
                addressInfoDiv.innerHTML = `
                    <h3 class="section-title"><i class="fa fa-location-dot"></i> Adres Bilgileri</h3>
                    <p><strong>Sokak:</strong> ${user.address.street}</p>
                    <p><strong>Apartman:</strong> ${user.address.suite}</p>
                    <p><strong>Şehir:</strong> ${user.address.city}</p>
                    <p><strong>Posta Kodu:</strong> ${user.address.zipcode}</p>
                    <p><strong>Koordinatlar:</strong> ${user.address.geo.lat}, ${user.address.geo.lng}</p>
                `;
                card.appendChild(addressInfoDiv);

                const companyInfoDiv = document.createElement('div');
                companyInfoDiv.classList.add('card-section', 'company-info', 'toggle-section');
                companyInfoDiv.innerHTML = `
                    <h3 class="section-title"><i class="fa fa-building"></i> Şirket Bilgileri</h3>
                    <p><strong>Adı:</strong> ${user.company.name}</p>
                    <p><strong>Slogan:</strong> ${user.company.catchPhrase}</p>
                    <p><strong>BS:</strong> ${user.company.bs}</p>
                `;
                card.appendChild(companyInfoDiv);

                const contactInfoDiv = document.createElement('div');
                contactInfoDiv.classList.add('card-section', 'toggle-section');
                contactInfoDiv.innerHTML = `
                    <h3 class="section-title"><i class="fa fa-envelope"></i> İletişim Bilgileri</h3>
                    <p><strong>E-posta:</strong> ${user.email}</p>
                    <p><strong>Telefon:</strong> ${user.phone}</p>
                    <p><strong>Web Sitesi:</strong> <a href="https://${user.website}" target="_blank">${user.website}</a></p>
                `;
                card.appendChild(contactInfoDiv);

                toggleButton.addEventListener('click', function() {
                    const toggleSections = card.querySelectorAll('.toggle-section');
                    toggleSections.forEach(section => {
                        section.style.display = section.style.display === 'none' ? 'block' : 'none';
                    });
                    toggleButton.textContent = toggleButton.textContent === 'Daha Fazla Göster' ? 'Daha Az Göster' : 'Daha Fazla Göster';
                });

                const initialToggleSections = card.querySelectorAll('.toggle-section');
                initialToggleSections.forEach(section => {
                    section.style.display = 'none';
                });

                userCardsContainer.appendChild(card);
            });
        };

        // İlk başta tüm kullanıcıları göster
        displayUsers(allUsers);

        // Kullanıcı kartlarına tıklama olayını ekle
        userCardsContainer.addEventListener('click', function(event) {
            const clickedElement = event.target;
            if (clickedElement.classList.contains('user-id-element')) {
                const userId = parseInt(clickedElement.textContent.split(':')[1].trim());
                // Tıklanan ID'ye sahip kullanıcıları filtrele (aslında sadece bir tane olacak)
                const filteredUsers = allUsers.filter(user => user.id === userId);
                displayUsers(filteredUsers);
            }
        });

    } catch (error) {
        console.error("Veri çekilirken bir hata oluştu:", error);
        const userCardsContainer = document.getElementById('user-cards-container');
        userCardsContainer.innerHTML = '<p style="color: red;">Kullanıcı verileri yüklenirken bir hata oluştu.</p>';
    }
})();