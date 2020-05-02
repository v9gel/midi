class Note {
  private readonly duration: string;
  private readonly pitch: string;
  constructor(duration: string, pitch: string) {
    this.duration = duration;
    this.pitch = pitch;
  }

  getDuration() {
    return this.duration;
  }

  getPitch() {
    return this.pitch;
  }
}

export default Note;
