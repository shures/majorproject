import React from 'react';
export  class Canvas extends React.Component{
    canvas(){
          let c = document.getElementById("myCanvas");
          let ctx = c.getContext("2d");
          let img = document.getElementById("scream");
          let file = ctx.drawImage(img,10,10, img.width=300 ,img.height=300);
           console.log(file.toDataURL())
    }
    render(){
        return(
            <div>
                <video id="scream" height={300} width={300}>
                    <source src={require('./test.mp4')}/>
                </video>
                <canvas id="myCanvas" width="250" height="300"
                        style={{border:'1px solid red'}}>
                </canvas>
                <button onClick={this.canvas}>Try it</button>
            </div>
        )
    }
}