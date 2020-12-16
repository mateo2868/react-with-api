import React, { Component } from 'react'


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serachInputText: '',
            artistas: [],
            token: 'BQB3QLHklFrfFEErjyTuELp3es8OT7MuNwI2iHTGdvo298GKdKkC7J4DZRCDGeouZBUox-kdldLNZhv1YKAQgio925DckkApbSwKyyCh3IRbqU_HBkMd9fpiIoz4stUxrE9E54gOt1mec40TtGj9H5dnWAprREMEgS8e8QmtWQFhBJ11v31gNmY'
        };
        this.searchInputChange = this.searchInputChange.bind(this)
    }

    searchInputChange = function($v) {
        if ($v.target.value == '') {
            return;
        }
        this.setState({
            serachInputText: $v.target.value,
        });
        setTimeout(() => {
            fetch(`https://api.spotify.com/v1/search?q=${$v.target.value}&type=artist&limit=10`, 
            {
                method: 'get', 
                headers: new Headers({
                    'Authorization': `Bearer ${this.state.token}` , 
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.artists) {
                        this.setState({
                            artistas: result.artists.items.map((todo) =>
                                {
                                    let img;
                                    if(todo.images[0]) {
                                        img = <img src={todo.images[0].url} class="card-img-top" alt="..." />
                                    }
                                    return (
                                        // <div>
                                        <div class="card carta">
                                            {img}
                                            
                                            <div class="card-body">
                                                <h5 class="card-title">{todo.name}</h5>
                                                {/* <p></p> */}
                                                <a href="#" class="btn btn-primary">Go somewhere</a>
                                            </div>
                                        </div>
                                        // </div>
    
                                    )
                                }
    
                            ),
                        });
                    }
                },
                // Nota: es importante manejar errores aquí y no en 
                // un bloque catch() para que no interceptemos errores
                // de errores reales en los componentes.
                (error) => {
                    console.log(error)
                    // this.setState({
                    //   isLoaded: true,
                    //   error
                    // });
                }
            )
        }, 0);
        
    }


    render() {
        // let artistas = [];
        // if (this.state.artistas.length > 0) {
        //     artistas = this.state.artistas.map((todo) =>
        //     {
        //         console.log(todo.images[0]);
        //             // if (todo.images[1].url !== undefined) {
        //             //     return (<div className="col col-lg-3">
        //             //         <div class="card">
        //             //             <img src={todo.images[1].url} class="card-img-top" alt="..." />
        //             //             <div class="card-body">
        //             //                 <h5 class="card-title">{todo.name}</h5>
        //             //                 <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        //             //                 <a href="#" class="btn btn-primary">Go somewhere</a>
        //             //             </div>
        //             //         </div>
        //             //     </div>)
        //             // }

        //         }
        //     )
            
        // }
        return (
            <div>
                <div className="container">
                    <input type="text" className="form-control" value={this.serachInputText} onChange={this.searchInputChange} />

                    <div className="row">
                        {this.state.artistas}
                    </div>
                </div>

            </div>
        )
    }
}
