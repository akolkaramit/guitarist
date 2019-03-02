import React, { Component } from 'react';
 
export default class Carousel extends Component {
  render() {
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
            </ol>
            <div className="carousel-inner">
            <div className="carousel-item active">
                <img className="d-block w-100" src="/images/banners/demo1.png" alt="First slide" />
                <div className="carousel-caption d-none d-md-block">
                <h5>Music doesn’t lie. If there is something to be changed in this world, then it can only happen through music.</h5>
                <p>The point is, that Hendrix was not the best guitar player among his contemporaries. The fact is, he played more naturally. He was a creative person, and he personified the music he played: he was this music himself.</p>
                </div>
            </div>
            <div className="carousel-item">
                <img className="d-block w-100" src="/images/banners/demo2.png" alt="Second slide" />
                <div className="carousel-caption d-none d-md-block">
                <h5>Music is a necessity. After food, air, water and warmth, music is the next necessity of life.</h5>
                <p>There is a reason why people are ready to pay a lot to see Richards’ playing. He created many amazing and diverse songs and melodies. His guitar playing has always been innovative, and his use of constantly changing approaches has always been in at the heart of The Rolling Stones’ sound.</p>
                </div>
            </div>
            <div className="carousel-item">
                <img className="d-block w-100" src="/images/banners/demo3.png" alt="Third slide" />
                <div className="carousel-caption d-none d-md-block">
                <h5>No second chances in the land of a thousand dances, the valley of ten million insanities.</h5>
                <p>Ryland Peter Cooder is a charismatic, multifaceted and extraordinary musician best known for his starring role in Buena Vista Social Club. Ry started as a teenager and a promising blues musician, and he became famous for his slide guitar work.</p>
                </div>
            </div>
            <div className="carousel-item">
                <img className="d-block w-100" src="/images/banners/demo4.png" alt="Third slide" />
                <div className="carousel-caption d-none d-md-block">
                <h5>I believe every guitar player inherently has something unique about their playing. They just have to identify what makes them different and develop it.</h5>
                <p>This Led Zeppelin guitarist has become one of the greatest players of all time. However, he is also one of the greatest composers and producers in the world of rock. Having such an extensive set of songs, solos and rhythms, Jimmy Page has easily become one of the titans in music industry.</p>
                </div>
            </div>
            <div className="carousel-item">
                <img className="d-block w-100" src="/images/banners/demo5.png" alt="Third slide" />
                <div className="carousel-caption d-none d-md-block">
                <h5>You don’t just go to the studio and say, ‘I’m going to write a hit.’ It becomes a hit when people like your compositions.</h5>
                <p>Berry is best known for being one of the first rock and roll guitarists. As a result, he served as an inspiration for famous guitarists such as Beatles and The Rolling Stones. Chuck Berry was economical and clean as a guitarist, and he was bright and witty as a showman.</p>
                </div>
            </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
            </a>
        </div>
    );
  }
}