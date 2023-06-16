const uploadBox = document.querySelector('.upload-box') ;
const fileInput = uploadBox.querySelector('input');
const previewImg = uploadBox.querySelector('img');
const widthInput = document.querySelector('.width input');
const heightInput = document.querySelector('.height input');
const ratioInput = document.querySelector('.ratio input');
const qualityInput = document.querySelector('.quality input');
const downloadBtn = document.querySelector('.download-btn');
let ratioImg ;
uploadBox.addEventListener('click', ()=>fileInput.click())

const loadFile = (e)=>
{ 
    const file = e.target.files[0];
    if(!file) return ;
   
   
        previewImg.src = URL.createObjectURL(file)
        previewImg.addEventListener("load" , ()=>
{
     ratioImg =  previewImg.naturalWidth / previewImg.naturalHeight
    widthInput.value = previewImg.naturalWidth;
    heightInput.value = previewImg.naturalHeight;
    document.querySelector(".wrapper").classList.add("active")
})
       
    


}

fileInput.addEventListener("change" , loadFile)

widthInput.addEventListener("keyup", ()=>
{
    const height = ratioInput.checked ? widthInput.value / ratioImg : heightInput.value ;
    heightInput.value = Math.floor(height) ;
})

heightInput.addEventListener("keyup", ()=>
{
    const width = ratioInput.checked ? heightInput.value * ratioImg : widthInput.value ;
    widthInput.value = Math.floor(width) ;
})

const resizeImage = ()=>
{
    const canvas = document.createElement('canvas');
    const a = document.createElement('a');
    const imgQuality = qualityInput.checked ? 0.7 : 1.0 ;
    const ctx = canvas.getContext('2d');
   

    canvas.width = widthInput.value ;
    canvas.height = heightInput.value ;


    ctx.drawImage(previewImg , 0 ,0 , canvas.width , canvas.height)
    a.href = canvas.toDataURL("image/jpeg" , imgQuality);
    a.download = new Date().getTime();
    a.click()
 
}

downloadBtn.addEventListener('click' , resizeImage)