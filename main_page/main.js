let user = JSON.parse(localStorage.getItem('currentUser'));

const container = document.querySelector('.countries-wrapper');
const searchInput = document.querySelector('.search-input');
const loader = document.querySelector('.loader');
const warning = document.querySelector('.warning');
const favorites = document.querySelector('.favorites');
const CountriesSign = document.querySelector('.title');
const logOutBtn = document.querySelector('.logout-button');

if (searchInput.value === '') {
    loader.classList.remove('hidden');
    loader.classList.remove('hidden');
    fetch('https://restcountries.eu/rest/v2/all')
        .then((res) => res.json())
        .then((res) => {
            res.forEach((country) => {
                const countryCountainer = document.createElement('div');
                const nameP = document.createElement('p');
                const favBtn = document.createElement('button');

                loader.classList.add('hidden');

                countryCountainer.classList.add('country-container');
                countryCountainer.style.backgroundImage = `url(${country.flag})`;
                countryCountainer.style.backgroundSize = '340px 275px';

                nameP.textContent = country.name;
                nameP.classList.add('text-decoration');

                favBtn.textContent = '+';
                favBtn.classList.add('fav-btn-decoration');

                favBtn.addEventListener('click', () => {
                    user.favorites.push(country)
                    localStorage.setItem('currentUser', JSON.stringify(user));
                });

                container.append(countryCountainer);
                countryCountainer.append(favBtn);
                countryCountainer.append(nameP);

            })
        })
}

searchInput.addEventListener('input', (event) => {
    const numbers = /^[0-9]+$/;
    if (event.target.value.match(numbers)) {
        warning.style.visibility = 'visible';
    } else {
        warning.style.visibility = 'hidden';
        fetch(`https://restcountries.eu/rest/v2/name/${event.target.value}`)
            .then(res => res.json())
            .then(country => {
                container.innerHTML = '';
                country.forEach(({ flag, name }) => {
                    const countryCountainer = document.createElement('div');
                    const nameP = document.createElement('p');
                    const favBtn = document.createElement('button');

                    countryCountainer.classList.add('country-container');
                    countryCountainer.style.backgroundImage = `url(${flag})`;
                    countryCountainer.style.backgroundSize = '340px 275px';

                    nameP.textContent = name;
                    nameP.classList.add('text-decoration');

                    favBtn.textContent = '+';
                    favBtn.classList.add('fav-btn-decoration');

                    container.append(countryCountainer);
                    countryCountainer.append(favBtn);
                    countryCountainer.append(nameP);
                })
            })
    }
})

favorites.addEventListener('click', () => {
    container.innerText = '';
    favorites.classList.add('black');
    user.favorites.forEach((country) => {
        const countryCountainer = document.createElement('div');
        const nameP = document.createElement('p');
        const favBtn = document.createElement('button');
        const removeBtn = document.createElement('button');

        loader.classList.add('hidden');

        countryCountainer.classList.add('country-container');
        countryCountainer.style.backgroundImage = `url(${country.flag})`;
        countryCountainer.style.backgroundSize = '340px 275px';

        nameP.textContent = country.name;
        nameP.classList.add('text-decoration');

        removeBtn.textContent = '-';
        removeBtn.classList.add('remove-btn-decoration');

        favBtn.textContent = '+';
        favBtn.classList.add('fav-btn-decoration');

        removeBtn.addEventListener('click', (event) => {
            let index = user.favorites.indexOf(country);
            if (index > -1) {
                user.favorites.splice(index, 1)
            }
            localStorage.setItem('currentUser', JSON.stringify(user));
            countryCountainer.remove();
        });

        container.append(countryCountainer);
        countryCountainer.append(favBtn);
        countryCountainer.append(removeBtn);
        countryCountainer.append(nameP);
    })

});

CountriesSign.addEventListener('click', () => {
    if (searchInput.value === '') {
        loader.classList.remove('hidden');
        favorites.classList.remove('black');
        fetch('https://restcountries.eu/rest/v2/all')
            .then((res) => res.json())
            .then((res) => {
                res.forEach((country) => {
                    const countryCountainer = document.createElement('div');
                    const nameP = document.createElement('p');
                    const favBtn = document.createElement('button');

                    loader.classList.add('hidden');

                    countryCountainer.classList.add('country-container');
                    countryCountainer.style.backgroundImage = `url(${country.flag})`;
                    countryCountainer.style.backgroundSize = '340px 275px';

                    nameP.textContent = country.name;
                    nameP.classList.add('text-decoration');

                    favBtn.textContent = '+';
                    favBtn.classList.add('fav-btn-decoration');

                    favBtn.addEventListener('click', () => {
                        user.favorites = [...user.favorites, country];
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    });

                    container.append(countryCountainer);
                    countryCountainer.append(favBtn);
                    countryCountainer.append(nameP);

                })
            })
    }
})

logOutBtn.addEventListener('click', () => {
    logOutBtn.href = '../login_page/index.html';
    user.username = null;
    user.password = null;
    localStorage.setItem('currentUser', JSON.stringify(user));
})

