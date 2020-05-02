<template>
  <div class="home">
    <button @click="handleDownload">download</button>
    <button @click="handlePlay">play</button>
  </div>
</template>

<script>
// @ is an alias to /src
import Beat from "@/modules/beat";
import Track from "@/modules/track";
import Duration from "@/modules/helpers/duration";
import * as WebAudioFontPlayer from "webaudiofont";
import * as MidiPlayer from "midi-player-js";

let instr = null;
const AudioContextFunc = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContextFunc();
const player = new WebAudioFontPlayer();

export default {
  name: "Home",
  data() {
    return {
      track: null
    };
  },
  methods: {
    handleDownload() {
      const link = document.createElement("a");
      link.download = "name.mid";
      link.href = this.track.getMidi();
      link.click();
    },
    async handlePlay() {
      const pipe = { key: 0 };
      function stopPipe(pipe) {
        if (pipe.envelope) {
          pipe.envelope.cancel();
          pipe.envelope = null;
        }
      }
      function playPipe(pipe) {
        stopPipe(pipe);
        pipe.envelope = player.queueWaveTable(
          audioContext,
          audioContext.destination,
          instr,
          0,
          pipe.key,
          999,
          true
        );
      }

      const Player = new MidiPlayer.Player(function(event) {
        if (event.name === "Note on") {
          pipe.key = event.noteNumber;
          playPipe(pipe);
        }
        if (event.name === "Note off") {
          pipe.key = event.noteNumber;
          stopPipe(pipe);
        }
        if (event.name === "End of Track") {
          pipe.key = event.noteNumber;
          stopPipe(pipe);
        }
        console.log(event);
      });

      Player.on("endOfFile", function() {
        stopPipe(pipe);
      });

      Player.loadDataUri(this.track.getMidi());
      Player.play();
    }
  },
  mounted() {
    function changeInstrument(path, name) {
      player.loader.startLoad(audioContext, path, name);
      player.loader.waitLoad(function() {
        instr = window[name];
      });
    }
    changeInstrument(
      "https://surikov.github.io/webaudiofontdata/sound/0520_Aspirin_sf2_file.js",
      "_tone_0520_Aspirin_sf2_file"
    );

    const b = new Beat([Duration.Eighth], 5);
    b.print();

    const t = new Track(b, 7);
    t.print();

    this.track = t;
    t.getMidi();
  }
};
</script>
