import Beat from "@/modules/beat";
import Note from "@/modules/note";
import HelpMath from "@/modules/helpMath";
import * as MidiWriter from "midi-writer-js";

class Track {
  private track: Note[];
  private beat: Beat;

  constructor(beat: Beat, length: number) {
    this.beat = Object.assign({}, beat);
    this.track = [];

    for (let i = 0; i < length; i++) {
      const pitch = HelpMath.arrayRandElement(["C4", "D4", "E4"], true);
      const note = new Note(beat.getElement(i % beat.length), pitch);
      this.track.push(note);
    }
  }

  print() {
    console.log(this.track);
  }

  getMidi(){
    const track = new MidiWriter.Track();
    const noteEvent: MidiWriter.NoteEvent = [];
    this.track.map(e => {
      noteEvent.push(new MidiWriter.NoteEvent({ pitch: e.getPitch(), duration: e.getDuration() }));
    });

    track.addEvent(noteEvent, function(event, index) {
      return { sequential: true };
    });

    const write = new MidiWriter.Writer(track);
    console.log(write.dataUri());
    return write.dataUri();
  }
}

export default Track;
