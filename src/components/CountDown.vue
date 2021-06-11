<template>
  <div class="n-count-down">
    <span v-if="!loaded">Loading...</span>
    <span v-else-if="state.infinite">N/A</span>
    <span v-else-if="state.expired">Expired</span>
    <span v-else>
      {{ daysStr }} {{ state.hours }}:{{ state.minutes }}:{{ state.seconds }}
    </span>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";
export default {
  name: "CountDown",
  props: {
    second: {
      type: [String, Number],
    },
    deadline: {
      type: [String, Date],
    },
    onExpired: {
      type: Function,
      default: (f) => f,
    },
  },
  setup(props) {
    let timer;
    const loaded = ref(false);
    const state = reactive({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: false,
      infinite: false,
    });
    const daysStr = computed(() => {
      const days = parseInt(state.days, 10);
      if (1 > days) return "";
      else if (2 > days) return `0${days} Day`;
      else if (9 > days) return `0${days} Days`;
      return `${days} Days`;
    });

    const getCountdownValues = (eventDate) => {
      const now = new Date();
      const currentTimeStamp = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate(),
          now.getUTCHours(),
          now.getUTCMinutes(),
          now.getUTCSeconds(),
          now.getUTCMilliseconds()
        )
      ).valueOf();
      const parseDate = (eDate) => {
        let dateParts = [];
        const eventDateParts = eDate.split(/\D/);
        for (let i = 0; i <= eventDateParts.length; i++) {
          dateParts[i] = parseInt(eventDateParts[i], 10);
        }
        const date = new Date(
          Date.UTC(
            dateParts[0],
            dateParts[1] - 1,
            dateParts[2],
            dateParts[3],
            dateParts[4],
            dateParts[5]
          )
        );
        return date.valueOf();
      };
      const deadlineTimeStamp =
        typeof eventDate === "string"
          ? parseDate(eventDate)
          : eventDate.valueOf();
      const convertMilliseconds = (ms) => {
        let d, h, m, s, padNumber;
        s = Math.floor(ms / 1000);
        m = Math.floor(s / 60);
        h = Math.floor(m / 60);
        d = Math.floor(h / 24);
        padNumber = function (n) {
          return n < 10 ? "0" + String(n) : n;
        };
        return {
          total: ms,
          days: d,
          hours: padNumber(h % 24),
          minutes: padNumber(m % 60),
          seconds: padNumber(s % 60),
        };
      };
      const timeDifference = deadlineTimeStamp - currentTimeStamp;
      return convertMilliseconds(timeDifference);
    };

    onMounted(() => {
      if (props.second) {
        let numberSecond = parseInt(props.second, 10);
        timer = setInterval(() => {
          state.days = Math.floor(numberSecond / (60 * 60 * 24));
          state.hours = Math.floor((numberSecond / (60 * 60)) % 24);
          state.minutes = Math.floor((numberSecond / 60) % 60);
          state.seconds = Math.floor(numberSecond % 60);
          loaded.value = true;
          numberSecond -= 1;
          if (numberSecond < 0) {
            state.expired = true;
            state.infinite = false;
            props.onExpired();
            clearInterval(timer);
          }
        }, 1000);
      } else if (props.deadline) {
        timer = setInterval(() => {
          let { days, hours, minutes, seconds, total } = getCountdownValues(
            props.deadline
          );
          state.days = days;
          state.hours = hours;
          state.minutes = minutes;
          state.seconds = seconds;
          loaded.value = true;
          if (0 >= total) {
            state.expired = true;
            state.infinite = false;
            props.onExpired();
            clearInterval(timer);
          }
        }, 1000);
      } else {
        loaded.value = true;
        state.infinite = true;
        state.expired = false;
      }
    });

    return { loaded, state, daysStr };
  },
};
</script>

<style lang="scss" scope>
.n-count-down {
  display: inline-block;
}
</style>