let cart = [];
let totalPrice = 0;

window.onload = function () {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser) {
    showLoggedInUser(storedUser.email);
  }

  if (document.getElementById('home').style.display === 'block') {
    startSlider();
  }
};

function showPage(pageId) {
  document.querySelectorAll('section').forEach(section => {
    section.style.display = 'none';
  });

  document.getElementById(pageId).style.display = 'block';

  if (pageId === 'cart') {
    displayCart();
  } else {
    clearInterval(sliderInterval);
  }
}

function showRegisterPage() {
  showPage('register');
}

function addToCart(productName, price) {
  const storedUser = JSON.parse(localStorage.getItem('user'));

  if (!storedUser) {
    alert('Ürün eklemek için giriş yapmalısınız.');
    showLoginPage();
    return;
  }

  const existingItem = cart.find(item => item.productName === productName);

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    cart.push({ productName, price, quantity: 1 });
  }

  totalPrice += price;
  displayCart();
}

function displayCart() {
  const cartItemsContainer = document.getElementById('cartItems');
  const totalElement = document.getElementById('totalPrice');

  cartItemsContainer.innerHTML = '';
  cart.forEach(item => {
    const cartItem = document.createElement('div');

    const productName = document.createElement('p');
    productName.innerText = `${item.productName} - ${item.price} TL`;

    const quantityLabel = document.createElement('label');
    quantityLabel.innerText = `Adet: ${item.quantity || 1}`;

    const increaseButton = document.createElement('button');
    increaseButton.innerText = '+';
    increaseButton.className = 'arttir';
    increaseButton.onclick = function () {
      increaseQuantity(item.productName, item.price);
    };
    
    const decreaseButton = document.createElement('button');
    decreaseButton.innerText = '-';
    decreaseButton.className = 'azalt';
    decreaseButton.onclick = function () {
      decreaseQuantity(item.productName, item.price);
    };

    cartItem.appendChild(productName);
    cartItem.appendChild(quantityLabel);
    cartItem.appendChild(increaseButton);
    cartItem.appendChild(decreaseButton);

    cartItemsContainer.appendChild(cartItem);
  });

  totalElement.innerText = totalPrice;
}

function increaseQuantity(productName, price) {
  const itemIndex = cart.findIndex(item => item.productName === productName);
  if (itemIndex !== -1) {
    cart[itemIndex].quantity = (cart[itemIndex].quantity || 1) + 1;
    totalPrice += price;
    displayCart();
  }
}

function decreaseQuantity(productName, price) {
  const itemIndex = cart.findIndex(item => item.productName === productName);

  if (itemIndex !== -1 && cart[itemIndex].quantity === 1) {
    const confirmRemove = confirm("Bu ürünü çıkartmak istediğinize emin misiniz?");

    if (confirmRemove) {
      totalPrice -= price * cart[itemIndex].quantity;
      cart.splice(itemIndex, 1);
      displayCart();
    }
  } else if (itemIndex !== -1 && cart[itemIndex].quantity > 1) {
    cart[itemIndex].quantity -= 1;
    totalPrice -= price;
    displayCart();
  }
}

function showProducts(category) {
  const productListContainer = document.getElementById('productList');
  productListContainer.innerHTML = '';

  if (category === 'category1') {
    addProduct('Brownie', 24, './atistirmalik/5096312-78bb08.jpg');
    addProduct('Cicibebe', 25, './atistirmalik/07010101-ae368c.jpg');
    addProduct('Burçak', 38, './atistirmalik/07010133-2cad2d.jpg');
    addProduct('Çubuk Kraker', 3, './atistirmalik/07010209-1747ff.jpg');
    addProduct('Balık Kraker', 5, './atistirmalik/7030231-ab217d.jpg');
    addProduct('Halley', 30, './atistirmalik/07160175-ebeec5.jpg');
    addProduct('Bonibon', 39, './atistirmalik/07163049-69adf4.jpg');
    addProduct('Rulokat', 40, './atistirmalik/8089819-5f54d6.jpg');
    addProduct('Sütlü Çikolata', 10, './atistirmalik/7010601-49ee52.jpg');
    addProduct('Çekirdek', 32, './atistirmalik/07019484-b48423.jpg');
  } else if (category === 'category2') {
    addProduct('Pepsi Kutu', 90, './icecek/08010311-34e54e.jpeg');
    addProduct('CocaCola', 60, './icecek/8010700-bc41c3.jpg');
    addProduct('CocaCola Zero', 60, './icecek/8010701-5a4a8b.jpg');
    addProduct('Pepsi', 50, './icecek/08011101-66cec0.jpeg');
    addProduct('Pepsi Max', 50, './icecek/08011150-f6299e.jpg');
    addProduct('Fanta', 60, './icecek/8022000-a73630.jpeg');
    addProduct('Schweppes Mandalina', 70, './icecek/8022710-31c232.jpeg');
    addProduct('Schweppes Limon', 70, './icecek/8022711-51ee4c.jpeg');
    addProduct('Sprite', 60, './icecek/8035000-072d2e.jpeg');
    addProduct('Schweppes Tonik', 70, './icecek/08035025-b2fe3d.jpeg');
    addProduct('Uludağ Gazoz', 80, './icecek/08038901-943be3.jpg');
    addProduct('Redbull', 40, './icecek/08110032-5c38b3.jpg');
    addProduct('Çamlıca Gazoz', 50, './icecek/camlica-gazoz-1-5-l-608401.jpg');
  } else if (category === 'category3') {
    addProduct('Mandalina', 60, './sebse-meyve/27287012-fce7ab.jpg');
    addProduct('Avokado', 60, './sebse-meyve/28010004-10a053.jpg');
    addProduct('Patates', 60, './sebse-meyve/28290036-6a65f9.jpg');
    addProduct('Kırmızı Biber', 60, './sebse-meyve/biber-kirmizi-kg-4ad206.jpg');
    addProduct('Domates', 60, './sebse-meyve/domates-kg-c7462d.jpg');
    addProduct('Salkım Domates', 60, './sebse-meyve/domates-salkim-kg-6e910c.jpg');
    addProduct('Kabak', 60, './sebse-meyve/kabak-sakiz-kg-31919c.jpg');
    addProduct('Limon', 60, './sebse-meyve/limon-kg-fbc52a.jpg');
    addProduct('Maydanoz', 60, './sebse-meyve/maydanoz-adet-659b84.jpg');
    addProduct('Muz', 60, './sebse-meyve/muz-yerli-kg-9d3d01.jpg');
  }

  document.getElementById('products').style.display = 'grid';
}

function addProduct(productName, price, imageSrc) {
  const productDiv = document.createElement('div');
  productDiv.className = 'product';
  productDiv.onclick = function () {
    addToCart(productName, price);
  };

  const productImage = document.createElement('img');
  productImage.src = imageSrc;
  productImage.alt = productName;

  const productInfo = document.createElement('p');
  productInfo.innerText = `${productName} - ${price} TL`;

  productDiv.appendChild(productImage);
  productDiv.appendChild(productInfo);
  document.getElementById('productList').appendChild(productDiv);
}

function checkout() {
  alert('Satın alma işlemi başarıyla tamamlandı!');
  cart = [];
  totalPrice = 0;
  displayCart();
}


function showLoggedInUser(email) {
  const loginForm = document.getElementById('loginForm');
  const userInfo = document.getElementById('userInfo');

  loginForm.style.display = 'none';
  userInfo.style.display = 'block';
  userInfo.innerHTML = `<p>Giriş yapıldı: ${email} <button onclick="logout()">Çıkış yap</button></p>`;
}

function showLoginPage() {
  const loginForm = document.getElementById('loginForm');
  const userInfo = document.getElementById('userInfo');

  loginForm.style.display = 'block';
  userInfo.style.display = 'none';
}

function login(email, password) {
  const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));

  if (registeredUser && email === registeredUser.email && password === registeredUser.password) {
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
    showLoggedInUser(email);
  } else {
    alert('Geçersiz kullanıcı adı veya şifre');
  }
}

function logout() {
  localStorage.removeItem('user');
  showLoginPage();
}

function register(firstName, lastName, phoneNumber, email, password) {
  const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));

  if (registeredUser && email === registeredUser.email) {
    alert('Bu e-posta zaten kayıtlı.');
  } else {
    const user = { firstName, lastName, phoneNumber, email, password };
    localStorage.setItem('registeredUser', JSON.stringify(user));
    login(email, password);
  }
}

let slideIndex = 2;
    slideShow(slideIndex);

    function slideRoute(n) {
        slideShow(slideIndex += n);
    }

    function currentSlide(n) {
        slideShow(slideIndex = n);
    }

    function slideShow(n) {
        let i;
        let slides = document.getElementsByClassName("slide");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slides.length
        }
        
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display="none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";

        dots[slideIndex-1].className +=" active";
    }