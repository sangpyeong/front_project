function FileList({ fileList }) {
  const listItems = (file) => {
    let filelist = [...file];
    console.log("filelist2", file);
    return filelist.map((file) => <li>{file.name}</li>);
  };
  return (
    <div>
      <ul>{listItems(fileList)}</ul>
    </div>
  );
}

export default FileList;
