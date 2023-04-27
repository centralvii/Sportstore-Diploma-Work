$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("product_id");

    if (productId) {
        $.get("get_product.php", { product_id: productId }, function (data) {
            const product = JSON.parse(data);
            $("#product-name").text(product.name);
            $("#product-image").attr("src", product.image_url);
            $("#product-description").text(product.description);
            $("#product-price").text(product.price);
        });
    }
});
