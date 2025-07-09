import React, { useState } from 'react';

export default function TextForm(props) {

    const handleUpClick = () => {
        console.log("Uppercase was clicked: " + text);
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to Uppercase", "success");
    };

    const handleLowClick = () => {
        console.log("Lowercase was clicked: " + text);
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to Lowercase", "success");
    };

    const handleClearClick = () => {
        console.log("Words are clear: " + text);
        let newText = "";
        setText(newText);
    };

    const handleRemoveSpacesClick = () => {
        console.log("Extra spaces removed: " + text);
        let newText = text.replace(/\s+/g, ' ').trim();
        setText(newText);
        props.showAlert("Extra spaces removed", "success");
    };

    const handleCopyClick = () => {
        navigator.clipboard.writeText(text);
        console.log("Text copied to clipboard: " + text);
        props.showAlert("Text copied to clipboard", "success");
    };

    const handleSpeakClick = () => {
        let utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
        console.log("Speaking text: " + text);
        props.showAlert("Speaking text", "success");
    };

    const handleOnChange = (event) => {
        console.log("On change");
        setText(event.target.value);
    };

    const handleTalkToType = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Sorry, your browser does not support speech recognition.");
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            console.log("Recognized speech: " + transcript);
            setText(text + " " + transcript);
            props.showAlert("Speech recognized", "success");
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            props.showAlert("Speech recognition error", "danger");
        };

        recognition.start();
    };

    const [text, setText] = useState('');

    const countWords = text.split(/\s+/).filter((word) => word.length !== 0).length;

    const countCharacters = text.replace(/\n/g, '').split("").filter((char) => char !== ' ').length;

    return (
        <>
            <div className="container " style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
                <h2 className='mb-2'>{props.heading}</h2>

                <div className="mb-3">
                    <h6>Enter your text below</h6>
                    <textarea
                        className="form-control"
                        value={text}
                        onChange={handleOnChange}
                        style={{
                            backgroundColor: props.mode === 'dark' ? '#13466e' : 'white',
                            color: props.mode === 'dark' ? 'white' : '#042743'
                        }}
                        id="myBox"
                        rows="3"
                    ></textarea>
                </div>

                {/* Button container */}
                <div className>
                    <button disabled={text.length === 0} className="btn btn-primary btn-sm mx-1 my-1" onClick={handleUpClick}>
                        Convert to Uppercase
                    </button>
                    <button disabled={text.length === 0} className="btn btn-primary btn-sm mx-1 my-1" onClick={handleLowClick}>
                        Convert to Lowercase
                    </button>
                    <button disabled={text.length === 0} className="btn btn-primary btn-sm mx-1 my-1" onClick={handleClearClick}>
                        Clear Text
                    </button>
                    <button disabled={text.length === 0} className="btn btn-primary btn-sm mx-1 my-1" onClick={handleRemoveSpacesClick}>
                        Remove Extra Spaces
                    </button>
                    <button disabled={text.length === 0} className="btn btn-primary btn-sm mx-1 my-1" onClick={handleCopyClick}>
                        Copy Text
                    </button>
                    <button disabled={text.length === 0} className="btn btn-primary btn-sm mx-1 my-1" onClick={handleSpeakClick}>
                        Speak Text
                    </button>
                    <button className="btn btn-primary btn-sm mx-1 my-1" onClick={handleTalkToType}>
                        Talk to Type
                    </button>
                </div>

                <div className="container mt-3" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
                    <h3>Your text summary</h3>
                    <p>{countWords} words and {countCharacters} characters (excluding spaces)</p>
                    <p>{0.008 * countWords} Minutes to read</p>
                    <h3>Preview</h3>
                    <p>{text.length > 0 ? text : "Nothing to preview"}</p>
                </div>
            </div>
        </>
    );
}
