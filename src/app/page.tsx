/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
'use client'

import "./home/home.css"
import p from "../imgs/p.jpg";
import { useState, useEffect } from "react";
import { Element, animateScroll as scroll, scroller } from "react-scroll";
import mat from "../imgs/mat.png";
import { TailSpin } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import { MediaRenderer } from "thirdweb/react";
import { client } from "../lib/client";

export default function Home() {
 
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [Contents, setContents] = useState([]);
  const [loaded, setLoaded] = useState(false);

  interface Nft {
    id: number;
    name: string;
    cover: string;
    price: number;
    supplyleft: number;
  }

  const [animationNft, setAnimation] = useState<Nft[]>([]);
  const [artsNft, setArts] = useState<Nft[]>([]);
  const [articlesNft, setArticles] = useState<Nft[]>([]);
  const [ebooksNft, setEbooks] = useState<Nft[]>([]);
  const [educationNft, setEducation] = useState<Nft[]>([]);
  const [moviesNft, setMovies] = useState<Nft[]>([]);
  const [musicNft, setMusic] = useState<Nft[]>([]);
  const [podcastNft, setPodcast] = useState<Nft[]>([]);
  const [postersNft, setPoster] = useState<Nft[]>([]);
  const [ticketsNft, setTickets] = useState<Nft[]>([]);

  useEffect(() => {
    getStats();
  }, [loaded])

  const handleClick = () => {
    setState(!state);
  }

  const allClickHandle = () => {
    scroll.scrollToTop({
      duration: 800,
      delay: 100,
      smooth: true
    });
  }

  const musicClickHandle = () => {
    scroller.scrollTo('music', {
      duration: 600,
      delay: 100,
      smooth: true,
    });
  }

  const animationClickHandle = () => {
    scroller.scrollTo('animation', {
      duration: 600,
      delay: 100,
      smooth: true
    });
  }

  const ebooksClickHandle = () => {
    scroller.scrollTo('ebooks', {
      duration: 600,
      delay: 100,
      smooth: true
    });
  }

  const artsClickHandle = () => {
    scroller.scrollTo('arts', {
      duration: 600,
      delay: 100,
      smooth: true
    });
  }

  const podcastClickHandle = () => {
    scroller.scrollTo('podcast', {
      duration: 600,
      delay: 100,
      smooth: true
    });
  }

  const articlesClickHandle = () => {
    scroller.scrollTo('articles', {
      duration: 600,
      delay: 100,
      smooth: true
    });
  }

  const moviesClickHandle = () => {
    scroller.scrollTo('films', {
      duration: 600,
      delay: 100,
      smooth: true
    });
  }

  const educationClickHandle = () => {
    scroller.scrollTo('education', {
      duration: 600,
      delay: 100,
      smooth: true
    });
  }

  const posterClickHandle = () => {
    scroller.scrollTo('posters', {
      duration: 600,
      delay: 100,
      smooth: true
    });
  }

  const ticketClickHandle = () => {
    scroller.scrollTo('ticket', {
      duration: 600,
      delay: 100,
      smooth: true
    });
  }


  //This function fetches the list of tokens that are still in supply.
  async function getStats() {
  }

  //This function is used for filtering the NFT's based on their category.
  function filterItems() {
  }

  //Function for purchasing a token.
  const buyToken = async (tokenId: number) => {
  }

  return (
    <>
      <div className="home">
        <div className="category">
          <div className="menu-icon">
            <i onClick={handleClick} className={state ? "fas fa-times"
              : "fas fa-bars"}>
            </i>
          </div>
          <ul className={state ? "c_menu active" :
            "c_menu"}>
            <li >
              <ul>
                <button className="t_btn" onClick={allClickHandle}>All</button>
              </ul>
            </li>
            <li>
              <ul>
                <button className="t_btn" onClick={animationClickHandle}>Animations</button>
              </ul>
            </li>
            <li>
              <ul>
                <button className="t_btn" onClick={articlesClickHandle}>Articles</button>
              </ul>
            </li>
            <li>
              <ul>
                <button className="t_btn" onClick={artsClickHandle}>Arts & Drawings</button>
              </ul>
            </li>
            <li>
              <ul>
                <button className="t_btn" onClick={ebooksClickHandle}>Ebooks</button>
              </ul>
            </li>
            <li>
              <ul>
                <button className="t_btn" onClick={educationClickHandle}>Education</button>
              </ul>
            </li>
            <li>
              <ul>
                <button className="t_btn" onClick={moviesClickHandle}>Movies</button>
              </ul>
            </li>
            <li>
              <ul>
                <button className="t_btn" onClick={musicClickHandle}>Music</button>
              </ul>
            </li>
            <li>
              <ul>
                <button className="t_btn" onClick={podcastClickHandle}>Podcasts</button>
              </ul>
            </li>
            <li>
              <ul>
                <button className="t_btn" onClick={posterClickHandle}>Posters</button>
              </ul>
            </li>
            <li>
              <ul>
                <button className="t_btn" onClick={ticketClickHandle}>Tickets</button>
              </ul>
            </li>
          </ul>
        </div>
        <div className="row">
          <div className="column1">
            <h1>Explore, Buy or Sell Your Products as NFTs.</h1>
          </div>
          <div className="column2">
            <img src={p.src} alt="img" width="1000px"></img>
          </div>
        </div>
      </div>
      <div className="Content">
        <Element name="animation" className="animation-section">
          <div className="insideContainer">
            <div className="txt">
              <h1>Animations</h1>
              <h3>Sell your animated content as NFTs.</h3>
            </div>
            {loading ? <div className="spinner">
              <TailSpin height={150}></TailSpin>
            </div> :
              <div>
                {animationNft.length === 0 ?
                  <div className="notfound">
                    <h2>No Items Found.</h2>
                  </div>
                  :
                  <div className="bcards">
                    {animationNft.map((e) => {
                      return (

                        <div className="conts">
                          <div className="ybgImage">
                            <MediaRenderer className="ycoverImg" src={e.cover} alt={e.name} client={client} />
                          </div>
                          <div className="details">
                            <div className="btitle-div">
                              <p>#{e.id} {e.name}</p>
                            </div>
                            <div className="bmiddle">
                              <div className="bleft">
                                <p className="bprice-text">Price</p>
                                <div className="beth">
                                  <div className="blogo-div">
                                    <img src={mat.src} alt="logo" />
                                  </div>
                                  <div className="bamount-div">
                                    <p>{e.price} MATIC</p>
                                  </div>
                                </div>
                              </div>
                              <div className="bright">
                                <p className="bremaining-text">Remaining</p>
                                <div className="btoken-status">
                                  {e.supplyleft}
                                </div>
                              </div>
                            </div>
                            <div className="bbtn">
                              <button className="buy" onClick={() => buyToken(e.id)}>
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                    }
                  </div>
                }
              </div>
            }
          </div>
        </Element>

        <Element name="articles" className="article-section">
          <div className="insideContainer">
            <div className="txt1">
              <h1>Articles</h1>
              <h3>Convert your articles into NFTs and get a digital proof of ownership.</h3>
            </div>
            {loading ? <div className="spinner">
              <TailSpin height={150}></TailSpin>
            </div> :
              <div>
                {articlesNft.length == 0 ?
                  <div className="notfound">
                    <h2>No Items Found.</h2>
                  </div>
                  :
                  <div className="bcards">
                    {articlesNft.map((e) => {
                      return (

                        <div className="conts">
                          <div className="ybgImage">
                            <MediaRenderer className="ycoverImg" src={e.cover} alt={e.name} client={client} />
                          </div>
                          <div className="details">
                            <div className="btitle-div">
                              <p>#{e.id} {e.name}</p>
                            </div>
                            <div className="bmiddle">
                              <div className="bleft">
                                <p className="bprice-text">Price</p>
                                <div className="beth">
                                  <div className="blogo-div">
                                    <img src={mat.src} />
                                  </div>
                                  <div className="bamount-div">
                                    <p>{e.price} MATIC</p>
                                  </div>
                                </div>
                              </div>
                              <div className="bright">
                                <p className="bremaining-text">Remaining</p>
                                <div className="btoken-status">
                                  {e.supplyleft}
                                </div>
                              </div>
                            </div>
                            <div className="bbtn">
                              <button className="buy" onClick={() => buyToken(e.id)}>
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                    }
                  </div>
                }
              </div>
            }
          </div>
        </Element>

        <Element name="arts" className="art-section">
          <div className="insideContainer">
            <div className="txt2">
              <h1>Arts & Drawing</h1>
              <h3>Showcase your skills and creativity in the form of NFTs.</h3>
            </div>
            {loading ? <div className="spinner">
              <TailSpin height={150}></TailSpin>
            </div> :
              <div>
                {artsNft.length == 0 ?
                  <div className="notfound">
                    <h2>No Items Found.</h2>
                  </div>
                  :
                  <div className="bcards">
                    {artsNft.map((e) => {
                      return (

                        <div className="conts">
                          <div className="ybgImage">
                            <MediaRenderer className="ycoverImg" src={e.cover} alt={e.name} client={client} />
                          </div>
                          <div className="details">
                            <div className="btitle-div">
                              <p>#{e.id} {e.name}</p>
                            </div>
                            <div className="bmiddle">
                              <div className="bleft">
                                <p className="bprice-text">Price</p>
                                <div className="beth">
                                  <div className="blogo-div">
                                    <MediaRenderer src={mat.src} client={client} />
                                  </div>
                                  <div className="bamount-div">
                                    <p>{e.price} MATIC</p>
                                  </div>
                                </div>
                              </div>
                              <div className="bright">
                                <p className="bremaining-text">Remaining</p>
                                <div className="btoken-status">
                                  {e.supplyleft}
                                </div>
                              </div>
                            </div>
                            <div className="bbtn">
                              <button className="buy" onClick={() => buyToken(e.id)}>
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                    }
                  </div>
                }
              </div>
            }
          </div>
        </Element>

        <Element name="ebooks" className="ebooks-section">
          <div className="insideContainer">
            <div className="txt3">
              <h1>EBooks</h1>
              <h3>Share your knowledge, ideas and beliefs with NFT based EBooks.</h3>
            </div>
            {loading ? <div className="spinner">
              <TailSpin height={150}></TailSpin>
            </div> :
              <div>
                {ebooksNft.length == 0 ?
                  <div className="notfound">
                    <h2>No Items Found.</h2>
                  </div>
                  :
                  <div className="bcards">
                    {ebooksNft.map((e) => {
                      return (

                        <div className="conts">
                          <div className="ybgImage">
                            <MediaRenderer className="ycoverImg" src={e.cover} alt={e.name} client={client} />
                          </div>
                          <div className="details">
                            <div className="btitle-div">
                              <p>#{e.id} {e.name}</p>
                            </div>
                            <div className="bmiddle">
                              <div className="bleft">
                                <p className="bprice-text">Price</p>
                                <div className="beth">
                                  <div className="blogo-div">
                                    <img src={mat.src} />
                                  </div>
                                  <div className="bamount-div">
                                    <p>{e.price} MATIC</p>
                                  </div>
                                </div>
                              </div>
                              <div className="bright">
                                <p className="bremaining-text">Remaining</p>
                                <div className="btoken-status">
                                  {e.supplyleft}
                                </div>
                              </div>
                            </div>
                            <div className="bbtn">
                              <button className="buy" onClick={() => buyToken(e.id)}>
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                    }
                  </div>
                }
              </div>
            }
          </div>
        </Element>

        <Element name="education" className="education-section">
          <div className="insideContainer">
            <div className="txt4">
              <h1>Education</h1>
              <h3>Explore, Buy or Sell your quality educational content with a digital proof.</h3>
            </div>
            {loading ? <div className="spinner">
              <TailSpin height={150}></TailSpin>
            </div> :
              <div>
                {educationNft.length == 0 ?
                  <div className="notfound">
                    <h2>No Items Found.</h2>
                  </div>
                  :
                  <div className="bcards">
                    {educationNft.map((e) => {
                      return (

                        <div className="conts">
                          <div className="ybgImage">
                            <MediaRenderer className="ycoverImg" src={e.cover} alt={e.name} client={client} />
                          </div>
                          <div className="details">
                            <div className="btitle-div">
                              <p>#{e.id} {e.name}</p>
                            </div>
                            <div className="bmiddle">
                              <div className="bleft">
                                <p className="bprice-text">Price</p>
                                <div className="beth">
                                  <div className="blogo-div">
                                    <img src={mat.src} />
                                  </div>
                                  <div className="bamount-div">
                                    <p>{e.price} MATIC</p>
                                  </div>
                                </div>
                              </div>
                              <div className="bright">
                                <p className="bremaining-text">Remaining</p>
                                <div className="btoken-status">
                                  {e.supplyleft}
                                </div>
                              </div>
                            </div>
                            <div className="bbtn">
                              <button className="buy" onClick={() => buyToken(e.id)}>
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                    }
                  </div>
                }
              </div>
            }
          </div>
        </Element>

        <Element name="films" className="films-section">
          <div className="insideContainer">
            <div className="txt5">
              <h1>Movies</h1>
              <h3>Sell your movies as NFTs.</h3>
            </div>
            {loading ? <div className="spinner">
              <TailSpin height={150}></TailSpin>
            </div> :
              <div>
                {moviesNft.length == 0 ?
                  <div className="notfound">
                    <h2>No Items Found.</h2>
                  </div>
                  :
                  <div className="bcards">
                    {moviesNft.map((e) => {
                      return (

                        <div className="conts">
                          <div className="ybgImage">
                            <img className="ycoverImg" src={e.cover} alt={e.name} />
                          </div>
                          <div className="details">
                            <div className="btitle-div">
                              <p>#{e.id} {e.name}</p>
                            </div>
                            <div className="bmiddle">
                              <div className="bleft">
                                <p className="bprice-text">Price</p>
                                <div className="beth">
                                  <div className="blogo-div">
                                    <img src={mat.src} />
                                  </div>
                                  <div className="bamount-div">
                                    <p>{e.price} MATIC</p>
                                  </div>
                                </div>
                              </div>
                              <div className="bright">
                                <p className="bremaining-text">Remaining</p>
                                <div className="btoken-status">
                                  {e.supplyleft}
                                </div>
                              </div>
                            </div>
                            <div className="bbtn">
                              <button className="buy" onClick={() => buyToken(e.id)}>
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                    }
                  </div>
                }
              </div>
            }
          </div>
        </Element>

        <Element name="music" className="music-section">
          <div className="insideContainer">
            <div className="txt6">
              <h1>Music</h1>
              <h3>No middle man cutting your sales. Create, Buy, Sell and Earn with your music NFTs.</h3>
            </div>
            {loading ? <div className="spinner">
              <TailSpin height={150}></TailSpin>
            </div> :
              <div>
                {musicNft.length == 0 ?
                  <div className="notfound">
                    <h2>No Items Found.</h2>
                  </div>
                  :
                  <div className="bcards">
                    {musicNft.map((e) => {
                      return (

                        <div className="conts">
                          <div className="ybgImage">
                            <MediaRenderer className="ycoverImg" src={e.cover} alt={e.name} client={client} />
                          </div>
                          <div className="details">
                            <div className="btitle-div">
                              <p>#{e.id} {e.name}</p>
                            </div>
                            <div className="bmiddle">
                              <div className="bleft">
                                <p className="bprice-text">Price</p>
                                <div className="beth">
                                  <div className="blogo-div">
                                    <img src={mat.src} />
                                  </div>
                                  <div className="bamount-div">
                                    <p>{e.price} MATIC</p>
                                  </div>
                                </div>
                              </div>
                              <div className="bright">
                                <p className="bremaining-text">Remaining</p>
                                <div className="btoken-status">
                                  {e.supplyleft}
                                </div>
                              </div>
                            </div>
                            <div className="bbtn">
                              <button className="buy" onClick={() => buyToken(e.id)}>
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                    }
                  </div>
                }
              </div>
            }
          </div>
        </Element>

        <Element name="podcast" className="podcast-section">
          <div className="insideContainer">
            <div className="txt7">
              <h1>Podcasts</h1>
              <h3>Convert your podcasts into NFTs and earn at a better rate.</h3>
            </div>
            {loading ? <div className="spinner">
              <TailSpin height={150}></TailSpin>
            </div> :
              <div>
                {podcastNft.length == 0 ?
                  <div className="notfound">
                    <h2>No Items Found.</h2>
                  </div>
                  :
                  <div className="bcards">
                    {podcastNft.map((e) => {
                      return (

                        <div className="conts">
                          <div className="ybgImage">
                            <MediaRenderer className="ycoverImg" src={e.cover} alt={e.name} client={client} />
                          </div>
                          <div className="details">
                            <div className="btitle-div">
                              <p>#{e.id} {e.name}</p>
                            </div>
                            <div className="bmiddle">
                              <div className="bleft">
                                <p className="bprice-text">Price</p>
                                <div className="beth">
                                  <div className="blogo-div">
                                    <img src={mat.src} alt="logo" />
                                  </div>
                                  <div className="bamount-div">
                                    <p>{e.price} MATIC</p>
                                  </div>
                                </div>
                              </div>
                              <div className="bright">
                                <p className="bremaining-text">Remaining</p>
                                <div className="btoken-status">
                                  {e.supplyleft}
                                </div>
                              </div>
                            </div>
                            <div className="bbtn">
                              <button className="buy" onClick={() => buyToken(e.id)}>
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                    }
                  </div>
                }
              </div>
            }
          </div>
        </Element>

        <Element name="posters" className="posters-section">
          <div className="insideContainer">
            <div className="txt8">
              <h1>Posters</h1>
              <h3>Get your posters ready as NFTs within minutes.</h3>
            </div>
            {loading ? <div className="spinner">
              <TailSpin height={150}></TailSpin>
            </div> :
              <div>
                {postersNft.length == 0 ?
                  <div className="notfound">
                    <h2>No Items Found.</h2>
                  </div>
                  :
                  <div className="bcards">
                    {postersNft.map((e) => {
                      return (

                        <div className="conts">
                          <div className="ybgImage">
                            <MediaRenderer className="ycoverImg" src={e.cover} alt={e.name} client={client} />
                          </div>
                          <div className="details">
                            <div className="btitle-div">
                              <p>#{e.id} {e.name}</p>
                            </div>
                            <div className="bmiddle">
                              <div className="bleft">
                                <p className="bprice-text">Price</p>
                                <div className="beth">
                                  <div className="blogo-div">
                                    <img src={mat.src} alt="logo" />
                                  </div>
                                  <div className="bamount-div">
                                    <p>{e.price} MATIC</p>
                                  </div>
                                </div>
                              </div>
                              <div className="bright">
                                <p className="bremaining-text">Remaining</p>
                                <div className="btoken-status">
                                  {e.supplyleft}
                                </div>
                              </div>
                            </div>
                            <div className="bbtn">
                              <button className="buy" onClick={() => buyToken(e.id)}>
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                    }
                  </div>
                }
              </div>
            }
          </div>
        </Element>

        <Element name="ticket" className="ticket-section">
          <div className="insideContainer">
            <div className="txt9">
              <h1>Tickets</h1>
              <h3>Convert any kind of tickets into NFTs.</h3>
            </div>
            {loading ? <div className="spinner">
              <TailSpin height={150}></TailSpin>
            </div> :
              <div>
                {ticketsNft.length == 0 ?
                  <div className="notfound">
                    <h2>No Items Found.</h2>
                  </div>
                  :
                  <div className="bcards">
                    {ticketsNft.map((e) => {
                      return (

                        <div className="conts">
                          <div className="ybgImage">
                            <img className="ycoverImg" src={e.cover} alt={e.name} />
                          </div>
                          <div className="details">
                            <div className="btitle-div">
                              <p>#{e.id} {e.name}</p>
                            </div>
                            <div className="bmiddle">
                              <div className="bleft">
                                <p className="bprice-text">Price</p>
                                <div className="beth">
                                  <div className="blogo-div">
                                    <img src={mat.src} alt="eth" />
                                  </div>
                                  <div className="bamount-div">
                                    <p>{e.price} MATIC</p>
                                  </div>
                                </div>
                              </div>
                              <div className="bright">
                                <p className="bremaining-text">Remaining</p>
                                <div className="btoken-status">
                                  {e.supplyleft}
                                </div>
                              </div>
                            </div>
                            <div className="bbtn">
                              <button className="buy" onClick={() => buyToken(e.id)}>
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                    }
                  </div>
                }
              </div>
            }
          </div>
        </Element>
      </div>
    </>
  );
}