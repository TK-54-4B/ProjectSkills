//copy paste, az wstyd na to patrzec
const mainImg = document.getElementById('mainImg');
const imgPreview = document.getElementsByClassName('img-preview');


imgPreview[0].onclick = function(){
    mainImg.src = imgPreview[0].src;
}
imgPreview[1].onclick = function(){
    mainImg.src = imgPreview[1].src;
}
imgPreview[2].onclick = function(){
    mainImg.src = imgPreview[2].src;
}
imgPreview[3].onclick = function(){
    mainImg.src = imgPreview[3].src;
}