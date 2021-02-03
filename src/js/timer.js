class CountdownTimer {
    constructor({ selector, targetDate }) {
      this.selector = selector;
      this.targetDate = targetDate;
    }
  
    createMarkup() {
      const timers = ["Days", "Hours", "Minutes", "Seconds"];
  
      const createItem = (timer) => {
        const itemRef = document.createElement("div");
        itemRef.classList.add("field");
        itemRef.insertAdjacentHTML(
          "afterbegin",
          `<span class="value" data-value="${timer.toLowerCase()}"></span>`
        );
        itemRef.insertAdjacentHTML(
          "beforeend",
          `<span class="label">${timer}</span>`
        );
        return itemRef;
      };
      const mappedTimers = timers.map((timer) => createItem(timer));
  
      const divRef = document.createElement("div");
      divRef.classList.add("timer");
      divRef.id = "#timer-1";
      divRef.append(...mappedTimers);
  
      const body = document.querySelector("body");
      body.insertAdjacentElement("afterbegin", divRef);
    }
  
    start() {
      const eventTime = this.targetDate.getTime();
  
      setInterval(() => {
        const currentTime = Date.now();
  
        const deltaTime = eventTime - currentTime;
  
        this.updateClockFace(deltaTime);
      }, 1000);
    }
  
    updateClockFace(time) {
      const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
      const hours = this.pad(
        Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
      const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
  
      const refs = {
        daysTimer: document.querySelector('[data-value="days"]'),
        hoursTimer: document.querySelector('[data-value="hours"]'),
        minutesTimer: document.querySelector('[data-value="minutes"]'),
        secondsTimer: document.querySelector('[data-value="seconds"]'),
      };
  
      refs.daysTimer.textContent = `${days}`;
      refs.hoursTimer.textContent = `${hours}`;
      refs.minutesTimer.textContent = `${mins}`;
      refs.secondsTimer.textContent = `${secs}`;
    }
  
    pad(value) {
      return String(value).padStart(2, "0");
    }
  }
  
  const timer = new CountdownTimer({
    selector: "#timer-1",
    targetDate: new Date("Apr 5, 2021"),
  });
  
  timer.createMarkup();
  timer.start();
  