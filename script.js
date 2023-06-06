// Fetch the JSON data
fetch('news.json')
  .then(response => response.json())
  .then(data => {
    // Update the main article section
    const mainArticle = document.getElementById('mainArticle');
    const { image, heading, author, tag, content, footerLink } = data.articles[0];
    mainArticle.innerHTML = `
      <div class="two_third first">
        <img class="borderedbox inspace-10" src="${image}" alt="">
      </div>
      <div class="one_third">
        <h6 class="heading">${heading}</h6>
        <ul class="nospace meta">
          <li><i class="fa fa-user"></i> <a href="#">${author}</a></li>
          <li><i class="fa fa-tag"></i> <a href="#">${tag}</a></li>
        </ul>
        <p>${content}</p>
        <footer class="nospace"><a class="btn" href="${footerLink}">Read More &raquo;</a></footer>
      </div>
    `;

    // Update the overview section
    const overviewList = document.getElementById('overviewList');
    data.overview.forEach(item => {
      const { image, heading, author, tag, content, footerLink } = item;
      const listItem = document.createElement('li');
      listItem.className = 'one_third';
      listItem.innerHTML = `
        <article>
          <a href="#"><img class="borderedbox inspace-10" src="${image}" alt=""></a>
          <h6 class="heading">${heading}</h6>
          <ul class="nospace meta">
            <li><i class="fa fa-user"></i> <a href="#">${author}</a></li>
            <li><i class="fa fa-tag"></i> <a href="#">${tag}</a></li>
          </ul>
          <p>${content}</p>
          <footer class="nospace"><a class="btn" href="${footerLink}">Read More &raquo;</a></footer>
        </article>
      `;
      overviewList.appendChild(listItem);
    });
  })
  .catch(error => console.error(error));

  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      // Access the carousel data from the JSON
      const carouselData = data.carousel;

      // Get the carousel element from the HTML
      const carousel = document.getElementById('carouselExampleIndicators');

      // Generate the carousel slides dynamically
      carouselData.forEach((slide, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) {
          carouselItem.classList.add('active');
        }

        const container = document.createElement('div');
        container.classList.add('container-fluid');

        const row = document.createElement('div');
        row.classList.add('row');

        const col1 = document.createElement('div');
        col1.classList.add('col-md-5', 'offset-md-1');

        const detailBox = document.createElement('div');
        detailBox.classList.add('detail-box');

        const number = document.createElement('div');
        number.classList.add('number');
        number.innerHTML = `<h5>${slide.number}</h5>`;

        const title = document.createElement('h1');
        title.innerHTML = `${slide.title}<br><span>${slide.subtitle}</span>`;

        const description = document.createElement('p');
        description.textContent = slide.description;

        const btnBox = document.createElement('div');
        btnBox.classList.add('btn-box');

        const link = document.createElement('a');
        link.classList.add('btn-1');
        link.href = slide.link;
        link.textContent = 'Read More';

        btnBox.appendChild(link);
        detailBox.appendChild(number);
        detailBox.appendChild(title);
        detailBox.appendChild(description);
        detailBox.appendChild(btnBox);
        col1.appendChild(detailBox);

        const col2 = document.createElement('div');
        col2.classList.add('col-md-6');

        const imgBox = document.createElement('div');
        imgBox.classList.add('img-box');

        const image = document.createElement('img');
        image.src = slide.image;
        image.alt = '';

        imgBox.appendChild(image);
        col2.appendChild(imgBox);

        row.appendChild(col1);
        row.appendChild(col2);
        container.appendChild(row);
        carouselItem.appendChild(container);
        carousel.appendChild(carouselItem);
      });
    })
    .catch(error => {
      console.log('Error fetching JSON:', error);
    });
