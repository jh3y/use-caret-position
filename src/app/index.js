import React, { useRef, useState, useEffect, Fragment } from 'react'
import { render } from 'react-dom'
import useCaretPosition from 'use-caret-position'
import GithubIcon from './github.svg'

const App = () => {
  const basicRef = useRef(null)
  const selectionRef = useRef(null)
  const triggerRef = useRef(null)
  const [showTrigger, setShowTrigger] = useState(false)
  const {
    x: basicX,
    y: basicY,
    getPosition: getPositionBasic,
  } = useCaretPosition(basicRef)
  const {
    x: selectionX,
    y: selectionY,
    getPosition: getPositionSelection,
    getSelection: getSelection,
  } = useCaretPosition(selectionRef)
  const {
    x: triggerX,
    y: triggerY,
    getPosition: getPositionTrigger,
  } = useCaretPosition(triggerRef)

  const handleCustomUI = (e) => {
    const previousCharacter = e.target.value
      .charAt(triggerRef.current.selectionStart - 2)
      .trim()
    const character = e.target.value
      .charAt(triggerRef.current.selectionStart - 1)
      .trim()
    if (character === '@' && previousCharacter === '') {
      setShowTrigger(true)
    }
    if (character === '' && showTrigger) {
      setShowTrigger(false)
    }
  }

  useEffect(() => {
    if (basicRef.current) {
      getPositionBasic(basicRef)
    }
    if (selectionRef.current) {
      getPositionSelection(selectionRef)
    }
    if (triggerRef.current) {
      getPositionTrigger(triggerRef)
    }
  }, [])

  return (
    <Fragment>
      <header>
        <a
          className="repo-link"
          href="https://github.com/jh3y/use-caret-position">
          <GithubIcon />
        </a>
        <h1>useCaretPosition</h1>
        <h2>A custom React hook for grabbing caret position</h2>
        <pre>
          <code>yarn add use-caret-position</code>
        </pre>
        <p>
          Provide the hook some form of text input ref. Get the caret position
          in return. All the styling, etc. is down to you.
        </p>
      </header>
      <section>
        <h3>Basic usage</h3>
        <p>Display a marker where the caret is.</p>
        <textarea
          ref={basicRef}
          placeholder="Interact with me!"
          spellCheck="false"
          onInput={() => getPositionBasic(basicRef)}
          onClick={() => getPositionBasic(basicRef)}
        />
        <span
          className="marker marker--basic"
          style={{
            '--y': basicY,
            '--x': basicX,
          }}>
          <span role="img">👈</span> Here!
        </span>
      </section>
      <section>
        <h3>On selection</h3>
        <p>Display a marker for a selection of text.</p>
        <textarea
          ref={selectionRef}
          spellCheck="false"
          readOnly
          onSelect={() => {
            if (
              selectionRef.current.selectionStart !==
              selectionRef.current.selectionEnd
            )
              getSelection(selectionRef)
          }}
          defaultValue={`Select some text.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur doloremque amet deserunt laboriosam aliquid! Error iusto fuga sint esse voluptatum, beatae harum explicabo omnis a tenetur, sequi modi odio ipsa?`}
        />
        <span
          className="marker marker--selection"
          style={{
            '--y': selectionY,
            '--x': selectionX,
          }}>
          Selection! <span role="img">👇</span>
        </span>
      </section>
      <section>
        <h3>Character trigger</h3>
        <p>Display a marker based on some text trigger.</p>
        <textarea
          ref={triggerRef}
          placeholder="Type the @ symbol to trigger UI"
          spellCheck="false"
          onKeyUp={handleCustomUI}
          onInput={() => getPositionTrigger(triggerRef)}
        />
        <span
          className="marker marker--trigger"
          style={{
            display: showTrigger ? 'block' : 'none',
            '--y': triggerY,
            '--x': triggerX,
          }}>
          Triggered UI! <span role="img">😎</span>
        </span>
      </section>
      <hr />
      <footer>
        Made in haste by <a href="https://twitter.com/jh3yy">Jhey.</a> &copy;
        2020 MIT.
      </footer>
    </Fragment>
  )
}

render(<App />, document.querySelector('#root'))
