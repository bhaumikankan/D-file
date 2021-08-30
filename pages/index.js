import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container, Form ,Button,Menu,Card, CardContent,Table,TableHeaderCell,TableRow,TableCell, TableBody,Message} from 'semantic-ui-react'
import contract from '../contract'
import {create} from "ipfs-http-client"
import web3 from '../web3'
import { Router, useRouter } from 'next/router'

const ipfs = create('https://ipfs.infura.io:5001/api/v0')

const Home =({allFiles})=>{

    const router=useRouter();
    const [file,setFile]=React.useState(null);
    const [fileName,setFileNmae]=React.useState('');
    const [fileType,setFileType]=React.useState('');
    const [buffer,setBuffer]=React.useState(null);
    const [Description,setDescription]=React.useState('');
    const [fileSize,setfileSize]=React.useState('');
    const [load,setLoad]=React.useState(false);
    const [error,setError]=React.useState(false);
    
    const updateFile=(e)=>{
        e.preventDefault();
       const file=e.target.files[0];
       setFile(file);
       const reader=new window.FileReader(file);
       reader.readAsArrayBuffer(file);
       reader.onloadend=()=>{
           setBuffer(reader.result);
           setFileNmae(file.name);
           setFileType(file.type);
           setfileSize(file.size);
       }
    }
    
    const uploadFile=async(e)=>{
        e.preventDefault();
        setLoad(true);
        try {
            const added = await ipfs.add(file)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            contract.methods.addFiles(fileName,url,fileSize,Description).send({
                from :(await web3.eth.getAccounts())[0]
            })
            setLoad(false)
            router.push('/')

          } catch (error) {
            //console.log('Error uploading file: ', error.message)
            setError(error.message)
            setLoad(false)
          }  
    }

    return(
        <div>
            <Container>
            <Menu style={{marginTop:'10px'}}>
            <Menu.Item>
            <h1>D-File Share</h1>
            </Menu.Item>
            <Menu.Item>
            <p>A decentralized file share application</p>
            </Menu.Item>
            </Menu>
            <Card fluid>
            <CardContent>
            <Form onSubmit={uploadFile} error={error}>
            <Form.Input onChange={(e)=>setDescription(e.target.value)} label='Description' required placeholder='Enter about the file' />
            <Form.Input onChange={updateFile} label='File' type='file' placeholder='' />
            <Button primary loading={load}>Submit</Button>
            <Message error>
            <Message.Header>Opps!!</Message.Header>
            <p>{error}</p>
            </Message>
            </Form>
            </CardContent>
            </Card>

            <Table celled>
            <Table.Header>
            <Table.Row>
            <Table.HeaderCell>File name</Table.HeaderCell>
            <Table.HeaderCell>File description</Table.HeaderCell>
            <Table.HeaderCell>Uploader Address</Table.HeaderCell>
            <Table.HeaderCell>File shareable link</Table.HeaderCell>
            </Table.Row>
            </Table.Header>

            <TableBody>
                {
                    allFiles.map((file,index) => {
                       return <Table.Row key={index}>
                        <Table.Cell>{file['1']}</Table.Cell>
                        <Table.Cell>{file['4']}</Table.Cell>
                        <Table.Cell>{file['6']}</Table.Cell>
                        <Table.Cell><Button positive onClick={() =>  navigator.clipboard.writeText(`${file[2]}`)}>Click here to copy link</Button><br></br>  <br></br><a href = {`${file[2]}`}>Open File</a>  </Table.Cell>
                        </Table.Row>
                    })
                    
                }
            </TableBody>
            </Table>

            </Container>
        </div>
    )
}

Home.getInitialProps=async()=>{
   var allFiles=[];
   const fileCount = await contract.methods.fileIndex().call();
   for(var i=fileCount;i>0;i--){
   const files= await contract.methods.Files(i).call()
   allFiles.push(files);
   }
    return {
        allFiles: allFiles,
    }
}

export default Home