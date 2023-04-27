$(document).ready(function () {
    function displayProducts(products) {
        $("#products").empty();
        for (const product of products) {
            const productDiv = $('<div class="product"></div>');
            productDiv.append('<img src="' + product.image_url + '" alt="' + product.name + '">');
            productDiv.append('<h3>' + product.name + '</h3>');
            productDiv.append('<p>Цена: ' + product.price + ' ₽</p>');
            productDiv.data("product-id", product.id);
            $("#products").append(productDiv);
    
            if (sessionStorage.getItem("admin")) {
                const deleteButton = $('<button class="delete-product">Удалить товар</button>');
                deleteButton.data("product-id", product.id);
                productDiv.append(deleteButton);
                
                
                deleteButton.on("click", function (event) {
                    event.stopPropagation();
                    const productId = $(this).data("product-id");
                    $.post("delete_product.php", { product_id: productId }, function (response) {
                        if (response === "success") {
                            alert("Товар удален");
                            productDiv.remove();
                        } else {
                            alert("Ошибка удаления товара");
                        }
                    });
                });
            }
        }
    }

    function refreshProducts(categoryId) {
        $.get("get_products.php", { category_id: categoryId }, function (data) {
            const products = JSON.parse(data);
            displayProducts(products);
        });
    }

    $("#category-selection button").on("click", function () {
        const categoryId = $(this).data("category-id");
        refreshProducts(categoryId);
    });

    $("#login").on("click", function () {
        const username = $("#username").val();
        const password = $("#password").val();
        $.post("login.php", { username, password }, function (response) {
            if (response === "success") {
                sessionStorage.setItem("admin", true);
                $("#admin-login").hide();
                $("#add-product").show();
                refreshProducts();
            } else {
                alert("Ошибка авторизации");
            }
        });
    });

    if (sessionStorage.getItem("admin")) {
        $("#admin-login").hide();
        $("#add-product").show();
        $("#logout").show();
    } else {
        $("#logout").hide();
    }
    
    $("#add").on("click", function () {
        const name = $("#product-name").val();
        const description = $("#product-description").val();
        const price = $("#product-price").val();
        const imageUrl = $("#product-image-url").val();
        const categoryId = $("#product-category").val();

        $.post("add_product.php", { name, description, price, image_url: imageUrl, category_id: categoryId }, function (response) {
            if (response === "success") {
                alert("Product added");
                $("#product-name").val("");
                $("#product-description").val("");
                $("#product-price").val("");
                $("#product-image-url").val("");
            } else {
                alert("Ошибка добавления товара");
            }
        });
    });

    $("#logout").on("click", function () {
        sessionStorage.removeItem("admin");
        $("#admin-login").show();
        $("#add-product").hide();
        refreshProducts();
    });

    $("#products").on("click", ".product", function () {
        const productId = $(this).data("product-id");
        sessionStorage.setItem("productId", productId);
        window.location.href = "product_page.html";
    });

    function displayProductPage() {
        if (window.location.pathname.includes("product_page.html")) {
            const productId = sessionStorage.getItem("productId");
            $.get("get_product.php", { product_id: productId }, function (data) {
                const product = JSON.parse(data);
                const productDiv = $('<div class="product-page"></div>');
                productDiv.append('<img src="' + product.image_url + '" alt="' + product.name + '">');
                productDiv.append('<h3>' + product.name + '</h3>');
                productDiv.append('<p>' + product.description + '</p>');
                productDiv.append('<p>Цена: ' + product.price + ' ₽</p>');

                const sizeLabel = $('<label for="size-selection">Выберите размер: </label>');
                const sizeSelection = $('<select id="size-selection"></select>');
                if (product.category_id === "2") {
                    for (let i = 36; i <= 45; i++) {
                        sizeSelection.append('<option value="' + i + '">' + i + '</option>');
                    }
                } else if (product.category_id === "1") {
                    const sizes = ["XS", "S", "M", "L", "XL"];
                    for (const size of sizes) {
                        sizeSelection.append('<option value="' + size + '">' + size + '</option>');
                    }
                }
                productDiv.append(sizeLabel);
                productDiv.append(sizeSelection);

                const addToCartButton = $('<button class="add-to-cart">Добавить в корзину</button>');
                productDiv.append(addToCartButton);
                $("#product-container").append(productDiv);

                addToCartButton.on("click", function () {
                    const sizeId = sizeSelection.val(); // уже содержит префикс
                    addToCart(productId, sizeId);
                    alert("Товар добавлен в корзину");
                });
                
            });
        }
    }

    function addToCart(productId, size) {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const newItem = { productId, size, count: 1 };
        const existingItemIndex = cart.findIndex(item => item.productId === productId && item.size === size);

        if (existingItemIndex >= 0) {
            // Если товар уже есть в корзине, увеличиваем его количество
            cart[existingItemIndex].count++;
        } else {
            // Если товара нет в корзине, добавляем его как новый элемент
            const cartItem = {
                productId: productId,
                size: size,
                count: 1  // Добавляем поле count
            };
            cart.push(newItem);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    }

    async function getProductById(productId) {
        const response = await fetch("get_product.php?product_id=" + productId);
        if (!response.ok) {
            throw new Error("Error fetching product data: " + response.statusText);
        }
        const productData = await response.json();
        return productData;
    }

    async function displayCart() {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const cartContainer = $("#cart-container");
        cartContainer.empty();
    
        let totalPrice = 0;
    
        for (const item of cart) {
            const product = await getProductById(item.productId);
            const productDiv = $('<div class="cart-item"></div>');
            productDiv.append('<img src="' + product.image_url + '" alt="' + product.name + '" width="60" height="70">');
    
            productDiv.append('<div class="item-info"><span class="item-name">' + product.name + '</span><br>');
            productDiv.append('<span class="item-size">Размер: ' + item.size + '</span><br>');
            productDiv.append('<span class="item-quantity">Количество: ' + item.count + '</span><br>');
            productDiv.append('<span class="item-price">' + product.price + ' ₽</span></div>');
            cartContainer.append(productDiv);
    
            const removeButton = $('<button class="remove-from-cart">Удалить</button>');
            removeButton.data("product-id", item.productId);
            removeButton.data("size", item.size);
            productDiv.append(removeButton);
    
            removeButton.on("click", async function () {
                const productId = $(this).data("product-id");
                const size = $(this).data("size");
                removeFromCart(productId, size);
                await displayCart();
                updateCartDisplay();
            });
    
            totalPrice += product.price * item.count;
        }
    
        // Добавить суммарную стоимость всех товаров
        cartContainer.append('<p id="total-price">Общая сумма: ' + totalPrice.toFixed(2) + ' ₽</p>');
    }
    
    function updateCartDisplay() {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const cartCount = cart.length;
    
        // Обновление отображения количества товаров в корзине
        $("#cart-count").text(cartCount);
        if (cartCount === 0) {
            $("#cart-container").text("Корзина пуста");
        }
    }

    function removeFromCart(productId, size) {
        let cart = JSON.parse(localStorage.getItem("cart") || "[]");
        let foundIndex = -1;
    
        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            if (item.productId === productId && item.size === size) {
                foundIndex = i;
                break;
            }
        }
    
        if (foundIndex !== -1) {
            cart.splice(foundIndex, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }

    $(document).ready(function() {
        $.ajax({
            url: 'get_orders.php',
            type: 'GET',
            dataType: 'json',
            success: async function(data) {
                console.log(data);
                var orders = data;
                for (var i = 0; i < orders.length; i++) {
                    var orderElement = $('<tr>');
                    var cartItems = JSON.parse(orders[i].cart);
    
                    var cartText = '';
                    for (var j = 0; j < cartItems.length; j++) {
                        var productName = await getProductName(cartItems[j].productId);
                        cartText += productName + ', Количество: ' + cartItems[j].count + ', Размер: ' + cartItems[j].size +';\n';
                    }
                    
                    orderElement.append($('<td>').text(orders[i].id));
                    orderElement.append($('<td>').text(orders[i].name));
                    orderElement.append($('<td>').text(orders[i].phone));
                    orderElement.append($('<td>').text(orders[i].email));
                    orderElement.append($('<td>').text(cartText));
                    orderElement.append($('<td>').text(orders[i].status));
                    

                    var changeStatusButton = $('<button>')
                    .text('Изменить статус')
                    .addClass('change-status-btn')
                    .data('order-id', orders[i].id);
                    orderElement.append($('<td>').append(changeStatusButton));

                    var deleteButton = $('<button>')
                    .text('Удалить заказ')
                    .addClass('delete-order-btn')
                    .data('order-id', orders[i].id);
                    orderElement.append($('<td>').append(deleteButton));
    
                    // Добавьте элемент заказа на страницу
                    $('#orders').append(orderElement);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
        $(document).on('click', '.change-status-btn', function() {
            var orderId = $(this).data('order-id');
            $.ajax({
                url: 'change_order_status.php',
                type: 'POST',
                data: { order_id: orderId },
                success: function(response) {
                    if (response === 'success') {
                        alert('Статус заказа успешно изменен!');
                        location.reload();
                    } else {
                        alert('Произошла ошибка при изменении статуса заказа!');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        });
        $(document).on('click', '.delete-order-btn', function() {
            var orderId = $(this).data('order-id');
            $.ajax({
                url: 'delete_order.php',
                type: 'POST',
                data: { order_id: orderId },
                success: function(response) {
                    if (response === 'success') {
                        alert('Заказ успешно удален!');
                        location.reload();
                    } else {
                        alert('Произошла ошибка при удалении заказа!');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        });
    });
    
    async function getProductName(id) {
        const response = await fetch('get_product_name.php?productId=' + id);
        const productName = await response.text();
        return productName;
    }

    $("#checkout-form").on("submit", async function(event) {
        event.preventDefault();
        const name = $("#name").val();
        const phone = $("#phone").val();
        const email = $("#email").val();
        const cart = localStorage.getItem("cart");
    
        const formData = new FormData();
        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("email", email);
        formData.append("cart", cart);
    
        const response = await fetch("process_order.php", {
            method: "POST",
            body: formData
        });
    
        const data = await response.json();
    
        if (data.status === "success") {
            alert("Заказ успешно оформлен!");
            clearCart();
            displayCart();
            updateCartDisplay();
        } else {
            alert("Ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз.");
        }
    });   
     
    function clearCart() {
        localStorage.removeItem("cart");
    }
    
    $("#clear-cart").on("click", function() {
        clearCart();
        displayCart(); // Обновление корзины после очистки
        updateCartDisplay();
    });

    
    
    displayCart();
    displayProductPage();
    updateCartDisplay();
    
    $("#open-cart").on("click", function () {
        window.location.href = "cart.html";
    });

    $("#back-to-home").on("click", function () {
        window.location.href = "index.html";
    });
}); 