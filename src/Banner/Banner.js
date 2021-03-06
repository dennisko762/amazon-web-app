

import React, { useState, useEffect, useRef } from 'react'
import Slide from '../Slide/Slide'
import SliderContent from '../SliderContent/SliderContent'
import Arrow from '../Arrow/Arrow'
import useStyles from "./styles"
function Banner(props) {

    //Bilder werden übergeben
    const { slides } = props

    const getWidth = () => window.innerWidth

    const classes = useStyles();

    //slides initialisieren
    const firstSlide = slides[0]
    const secondSlide = slides[1]
    const lastSlide = slides[slides.length - 1]


    const [state, setState] = useState({
        activeSlide: 0,
        translate: getWidth(),
        transition: 0.45,
        _slides: [lastSlide, firstSlide, secondSlide]
    })

    //Konstanten anhand des State erstellen um später darauf zugreifen zu können.
    const { activeSlide, translate, _slides, transition } = state

    //ähnlich zu useState aber Unsere komponente wird nicht neu gerendert wenn sich der
    //jeweilige current wert ändert.
    const autoPlayRef = useRef()
    const transitionRef = useRef()
    const resizeRef = useRef()
    const sliderRef = useRef()

    //erster useeffect der jedes mal gecalled wird 
    useEffect(() => {
        autoPlayRef.current = nextSlide
        transitionRef.current = smoothTransition
        resizeRef.current = handleResize
        console.log(getWidth())
    })
    //useEffect der nur beim ersten rendern gecalled wird
    useEffect(() => {
        const slider = sliderRef.current

        const play = () => {
            autoPlayRef.current()
        }

        const smooth = e => {
            if (e.target.className.includes('SliderContent')) {
                transitionRef.current()
            }
        }

        const resize = () => {
            resizeRef.current()
        }

        const transitionEnd = slider.addEventListener('transitionend', smooth)
        const onResize = window.addEventListener('resize', resize)

        let interval = null

        if (slides.autoPlay) {
            interval = setInterval(play, slides.autoPlay * 100)
        }
        //für component dimount
        return () => {
            slider.removeEventListener('transitionend', transitionEnd)
            window.removeEventListener('resize', onResize)

            if (slides.autoPlay) {
                clearInterval(interval)
            }
        }
    }, [])

    useEffect(() => {
        if (transition === 0) setState({ ...state, transition: 0.45 })
    }, [transition])

    const handleResize = () => {
        setState({ ...state, translate: getWidth(), transition: 0 })
    }

    const smoothTransition = () => {
        let _slides = []

        // We're at the last slide.
        if (activeSlide === slides.length - 1)
            //unser slide array folgt der logik [prev, active, next]
            //deshalb setzen wir unser previous auf length-2, last ist unser current, und next entsprechend first
            _slides = [slides[slides.length - 2], lastSlide, firstSlide]
        // We're back at the first slide. Just reset to how it was on initial render
        else if (activeSlide === 0) _slides = [lastSlide, firstSlide, secondSlide]
        // Create an array of the previous last slide, and the next two slides that follow it.
        else _slides = slides.slice(activeSlide - 1, activeSlide + 2)

        setState({
            ...state,
            _slides,
            transition: 0,
            translate: getWidth()
        })
    }

    const nextSlide = () =>
        setState({
            ...state,
            translate: translate + getWidth(),
            activeSlide: activeSlide === slides.length - 1 ? 0 : activeSlide + 1
        })

    const prevSlide = () =>
        setState({
            ...state,
            translate: 0,
            activeSlide: activeSlide === 0 ? slides.length - 1 : activeSlide - 1
        })

    return (

        <div className={classes.slider} ref={sliderRef}>
            <SliderContent
                translate={translate}
                transition={transition}
                width={getWidth() * _slides.length}
            >
                {_slides.map((_slide, i) => (
                    <Slide width={getWidth()} key={_slide + i} content={_slide} />

                ))}
            </SliderContent>

            <Arrow direction="left" handleClick={prevSlide} />
            <Arrow direction="right" handleClick={nextSlide} />

            {/*    <Dots slides={slides} activeSlide={activeSlide} /> */}
        </div>





    )
}



export default Banner
