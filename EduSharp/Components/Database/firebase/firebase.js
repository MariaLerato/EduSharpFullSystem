const fileType=['application/pdf']
  const handleFileChange=(e)=>{
    let selectedfile=e.target.files[0]
    if(selectedfile){
        if(selectedfile&&fileType.includes(selectedfile.type)){
          let reader=new FileReader();
          reader.readAsDataURL(selectedfile)
          reader.onloadend=(e)=>{
            setPdfFile(e.target.result)
            console.log(pdffile,'--------------------------------')
          }
        }else{
          setPdfFile(null)
          //handle errorr
        }
    }else{
      console.log('select a file')
    }
  }