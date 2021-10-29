
/**
 * Function is provided by https://stackoverflow.com/a/45979883/10744187
 * @param { string } chord The chord to transpose.
 * @param { number } amount The amount to transpose by. 
 * @returns 
 */
function transposeChord(chord, amount) {
    var scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
    var normalizeMap = { "Cb": "B", "Db": "C#", "Eb": "D#", "Fb": "E", "Gb": "F#", "Ab": "G#", "Bb": "A#", "E#": "F", "B#": "C" }
    return chord.replace(/[CDEFGAB](b|#)?/g, function (match) {
        var i = (scale.indexOf((normalizeMap[match] ? normalizeMap[match] : match)) + amount) % scale.length;
        return scale[i < 0 ? i + scale.length : i];
    })
}

/**
 * Compute the line and change the chords.
 * @param { Element } line 
 * @param { number } transposeBy The amount to transform the chords by.
 */
function proccessLine(line, transposeBy) {
    var chords = line.getElementsByTagName("span")

    for (let i = 0; i < chords.length; i++) {
        const curr = chords.item(i)

        curr.innerText = transposeChord(curr.innerText, transposeBy);
    }
}

/**
 * transpose all of the chords in the page.
 * @param { number } amount 
 */
function transposeAll(amount) {
    lines = document.getElementsByClassName("chords")

    for (let line of lines) {
        proccessLine(line, amount)
    }
}

chrome.storage.local.get(["amountToTranspose"], async ({ amountToTranspose }) => {
    transposeAll(amountToTranspose)

    await chrome.storage.local.remove("amountToTranspose");
})