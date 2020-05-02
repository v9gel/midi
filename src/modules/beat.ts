import HelpMath from "./helpMath";
// @ts-ignore
import * as MidiWriter from "midi-writer-js";

class Beat {
  public beat: string[];
  public length: number;
  constructor(usedDuration: string[], length: number) {
    this.length = length;
    this.beat = [];
    for (let i = 0; i < length; i++) {
      this.beat.push(HelpMath.arrayRandElement(usedDuration));
    }
  }

  getBeat(): string[] {
    return this.beat;
  }

  getElement(index: number): string {
    return this.beat[index];
  }

  print() {
    console.log(this.beat);
  }

  getMidi() {
    const track = new MidiWriter.Track();
    const noteEvent: MidiWriter.NoteEvent = [];
    this.beat.map(e => {
      noteEvent.push(new MidiWriter.NoteEvent({ pitch: "C4", duration: e }));
    });

    track.addEvent(noteEvent, function() {
      return { sequential: true };
    });

    const write = new MidiWriter.Writer(track);
    console.log(write.dataUri());
    return write.dataUri();
  }
}

export default Beat;
