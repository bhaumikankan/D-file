// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract FileContract{
    
    uint public fileIndex=0;
    
    struct newFile {
        uint fileId;
        string filename;
        string filehash;
        uint filesize;
        string filedescription;
        uint uploadTime;
        address uploader;
        
    }
    
    mapping(uint => newFile) public Files;
    
    function addFiles(string memory _filename,string memory _filehash,uint _filesize,string memory _filedescription) public{
        require(bytes(_filename).length>0);
        require(bytes(_filehash).length>0);
        require(bytes(_filedescription).length>0);
        require(msg.sender!=address(0));
        require(_filesize>0);
        fileIndex++;
        Files[fileIndex]=newFile(fileIndex,_filename,_filehash,_filesize,_filedescription,block.timestamp,msg.sender);
    }
}
