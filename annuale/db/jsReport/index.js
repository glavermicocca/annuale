const client = require('jsreport-client')('http://127.0.0.1:3000/reporting/api', process.env.JSREPORT_USER, process.env.JSREPORT_PASSWORD)

const emptyFirma =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAMbGlDQ1BJQ0MgUHJvZmlsZQAASImVVwdYU8kWnltSSWgBBKSE3gTpBJASQgsgvQg2QhJIKDEmBBU7uqjg2kUUK7oqothWQOzYlUWx98WCirIu6mJD5U1IQNd95Xvn++beP2fO/Kfcmdx7AND6wJNK81FtAAokhbLEiBDmqPQMJqkDEAAOdIAXIPP4cik7Pj4GQBm4/13e3QCI8n7VWcn1z/n/KroCoZwPADIG4iyBnF8A8XEA8LV8qawQAKJSbzWpUKrEsyDWk8EAIV6hxDkqvF2Js1T4cL9NciIH4ssAkGk8niwHAM17UM8s4udAHs3PELtKBGIJAFrDIA7ki3gCiJWxDysomKDElRDbQ3spxDAewMr6jjPnb/xZg/w8Xs4gVuXVL+RQsVyaz5vyf5bmf0tBvmLAhy0cNJEsMlGZP6zhrbwJ0UpMg7hLkhUbp6w1xB/EAlXdAUCpIkVkisoeNeHLObB+wABiVwEvNBpiE4jDJfmxMWp9VrY4nAsx3C3oZHEhNxliQ4jnC+VhSWqbjbIJiWpfaH22jMNW68/xZP1+lb4eKPJS2Gr+NyIhV82PaRaLktMgpkJsXSROjYVYE2IXeV5StNpmRLGIEztgI1MkKuO3hjhRKIkIUfFjRdmy8ES1fVmBfCBfbKNIzI1V432FouRIVX2wU3xef/wwF+yyUMJOGeARykfFDOQiEIaGqXLHngslKUlqng/SwpBE1VqcKs2PV9vjlsL8CKXeEmJPeVGSei2eWgg3p4ofz5YWxier4sSLc3lR8ap48CUgBnBAKGACBRxZYALIBeLWroYu+Es1Ew54QAZygBA4qzUDK9L6ZyTwmgSKwR8QCYF8cF1I/6wQFEH9l0Gt6uoMsvtni/pX5IGnEBeAaJAPfyv6V0kGvaWCJ1Aj/od3Hhx8GG8+HMr5f68f0H7TsKEmRq1RDHhkag1YEsOIocRIYjjRATfGA3F/PAZeg+Fwx1m470Ae3+wJTwlthEeE64R2wu3x4hLZD1GOBO2QP1xdi6zva4HbQk4vPAQPgOyQGTfAjYEz7gn9sPEg6NkLajnquJVVYf7A/bcMvnsaajuKKwWlDKEEU+x/XKnpqOk1yKKs9ff1UcWaNVhvzuDMj/4531VfAO/RP1pi87H92FnsBHYeO4w1ACZ2DGvEWrAjSjy4u570764Bb4n98eRBHvE//PHUPpWVlLvWuna6flbNFQonFyoPHmeCdIpMnCMqZLLh20HI5Er4LsOY7q7ubgAo3zWqv6+3Cf3vEMSg5Ztuzu8ABBzr6+s79E0XdQyAvT7w+B/8prNnAaCjAcC5g3yFrEilw5UXAvyX0IInzQiYAStgD/NxB97AHwSDMBAF4kAySAfjYJVFcJ/LwCQwDcwGpaAcLAErwRqwAWwG28EusA80gMPgBDgDLoLL4Dq4C3dPB3gJusE70IsgCAmhIwzECDFHbBAnxB1hIYFIGBKDJCLpSCaSg0gQBTINmYOUI8uQNcgmpAbZixxETiDnkTbkNvIQ6UTeIJ9QDKWheqgpaosOR1koG41Gk9GxaA46ES1G56KL0Eq0Gt2J1qMn0IvodbQdfYn2YADTwAwwC8wZY2EcLA7LwLIxGTYDK8MqsGqsDmuCz/kq1o51YR9xIs7Ambgz3MGReArOxyfiM/CF+Bp8O16Pn8Kv4g/xbvwrgU4wITgR/AhcwihCDmESoZRQQdhKOEA4Dc9SB+EdkUg0INoRfeBZTCfmEqcSFxLXEXcTjxPbiI+JPSQSyYjkRAogxZF4pEJSKWk1aSfpGOkKqYP0gaxBNie7k8PJGWQJuYRcQd5BPkq+Qn5G7qVoU2wofpQ4ioAyhbKYsoXSRLlE6aD0UnWodtQAajI1lzqbWkmto56m3qO+1dDQsNTw1UjQEGvM0qjU2KNxTuOhxkeaLs2RxqGNoSloi2jbaMdpt2lv6XS6LT2YnkEvpC+i19BP0h/QP2gyNF00uZoCzZmaVZr1mlc0X2lRtGy02FrjtIq1KrT2a13S6tKmaNtqc7R52jO0q7QPat/U7tFh6LjpxOkU6CzU2aFzXue5LknXVjdMV6A7V3ez7kndxwyMYcXgMPiMOYwtjNOMDj2inp0eVy9Xr1xvl16rXre+rr6nfqr+ZP0q/SP67QaYga0B1yDfYLHBPoMbBp+GmA5hDxEOWTCkbsiVIe8NhxoGGwoNywx3G143/GTENAozyjNaatRgdN8YN3Y0TjCeZLze+LRx11C9of5D+UPLhu4bescENXE0STSZarLZpMWkx9TMNMJUarra9KRpl5mBWbBZrtkKs6NmneYM80BzsfkK82PmL5j6TDYzn1nJPMXstjCxiLRQWGyyaLXotbSzTLEssdxted+KasWyyrZaYdVs1W1tbj3Sepp1rfUdG4oNy0Zks8rmrM17WzvbNNt5tg22z+0M7bh2xXa1dvfs6fZB9hPtq+2vORAdWA55DuscLjuijl6OIscqx0tOqJO3k9hpnVPbMMIw32GSYdXDbjrTnNnORc61zg9dDFxiXEpcGlxeDbcenjF86fCzw7+6ernmu25xveum6xblVuLW5PbG3dGd717lfs2D7hHuMdOj0eO1p5On0HO95y0vhtdIr3lezV5fvH28Zd513p0+1j6ZPmt9brL0WPGshaxzvgTfEN+Zvod9P/p5+xX67fP709/ZP89/h//zEXYjhCO2jHgcYBnAC9gU0B7IDMwM3BjYHmQRxAuqDnoUbBUsCN4a/IztwM5l72S/CnENkYUcCHnP8eNM5xwPxUIjQstCW8N0w1LC1oQ9CLcMzwmvDe+O8IqYGnE8khAZHbk08ibXlMvn1nC7o3yipkediqZFJ0WviX4U4xgji2kaiY6MGrl85L1Ym1hJbEMciOPGLY+7H28XPzH+UAIxIT6hKuFpolvitMSzSYyk8Uk7kt4lhyQvTr6bYp+iSGlO1Uodk1qT+j4tNG1ZWvuo4aOmj7qYbpwuTm/MIGWkZmzN6BkdNnrl6I4xXmNKx9wYazd28tjz44zH5Y87Ml5rPG/8/kxCZlrmjszPvDheNa8ni5u1Nqubz+Gv4r8UBAtWCDqFAcJlwmfZAdnLsp/nBOQsz+kUBYkqRF1ijniN+HVuZO6G3Pd5cXnb8vry0/J3F5ALMgsOSnQleZJTE8wmTJ7QJnWSlkrbJ/pNXDmxWxYt2ypH5GPljYV68KO+RWGv+EnxsCiwqKrow6TUSfsn60yWTG6Z4jhlwZRnxeHFv0zFp/KnNk+zmDZ72sPp7OmbZiAzsmY0z7SaOXdmx6yIWdtnU2fnzf6txLVkWclfc9LmNM01nTtr7uOfIn6qLdUslZXenOc/b8N8fL54fusCjwWrF3wtE5RdKHctryj/vJC/8MLPbj9X/ty3KHtR62LvxeuXEJdIltxYGrR0+zKdZcXLHi8fubx+BXNF2Yq/Vo5feb7Cs2LDKuoqxar2ypjKxtXWq5es/rxGtOZ6VUjV7rUmaxesfb9OsO7K+uD1dRtMN5Rv+LRRvPHWpohN9dW21RWbiZuLNj/dkrrl7C+sX2q2Gm8t3/plm2Rb+/bE7adqfGpqdpjsWFyL1ipqO3eO2Xl5V+iuxjrnuk27DXaX7wF7FHte7M3ce2Nf9L7m/az9db/a/Lr2AONAWT1SP6W+u0HU0N6Y3th2MOpgc5N/04FDLoe2HbY4XHVE/8jio9Sjc4/2HSs+1nNcerzrRM6Jx83jm++eHHXy2qmEU62no0+fOxN+5uRZ9tlj5wLOHT7vd/7gBdaFhoveF+tbvFoO/Ob124FW79b6Sz6XGi/7Xm5qG9F29ErQlRNXQ6+euca9dvF67PW2Gyk3bt0cc7P9luDW89v5t1/fKbrTe3fWPcK9svva9ysemDyo/t3h993t3u1HHoY+bHmU9OjuY/7jl0/kTz53zH1Kf1rxzPxZzXP354c7wzsvvxj9ouOl9GVvV+kfOn+sfWX/6tc/g/9s6R7V3fFa9rrvzcK3Rm+3/eX5V3NPfM+DdwXvet+XfTD6sP0j6+PZT2mfnvVO+kz6XPnF4UvT1+iv9/oK+vqkPBmv/1MAgwPNzgbgzTYA6OkAMGDfRh2t6gX7BVH1r/0I/Ces6hf7xRuAOvj9ntAFv25uArBnC2y/IL8W7FXj6QAk+wLUw2NwqEWe7eGu4qLBPoXwoK/vLezZSMsB+LKkr6+3uq/vy2YYLOwdj0tUPahSiLBn2Mj9klWQBf6NqPrT73L88Q6UEXiCH+//Ah8wkL5bDxZFAAAAimVYSWZNTQAqAAAACAAEARoABQAAAAEAAAA+ARsABQAAAAEAAABGASgAAwAAAAEAAgAAh2kABAAAAAEAAABOAAAAAAAAAJAAAAABAAAAkAAAAAEAA5KGAAcAAAASAAAAeKACAAQAAAABAAAAPKADAAQAAAABAAAAPAAAAABBU0NJSQAAAFNjcmVlbnNob3RMzY6pAAAACXBIWXMAABYlAAAWJQFJUiTwAAAB1GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj42MDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj42MDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlVzZXJDb21tZW50PlNjcmVlbnNob3Q8L2V4aWY6VXNlckNvbW1lbnQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpa3f/mAAAAHGlET1QAAAACAAAAAAAAAB4AAAAoAAAAHgAAAB4AAAQfP86uDwAAA+tJREFUaAW8WNli2zAMW/7/n5vxEEBQlN0sS+sHEQRBUoetZX087flzeJx8KG/E0whwnvVYTmolAzDs88/TspCXJSHQBh0PhRGf6P/Agse0dEV9LuENfdNgurArCBfWtgJbOOr9UP/H88sq9+2XadiuengdZU2vrS6cEduIza2cQ0CpT/fnCecStJUz6itOdQsvCjmptlHfQ2guT2/vob7i9/vHgnUXc8JeUD/QbOajP3ghiu1MqmSMRBvw0UvI4W/2zxOOmcv0Y4I2E6xjm+DJbSnNmeoRduIRQ740QzBr7ExLaU5XPuwT9pdOnmychGQuWqOuSf8iiKoWftqC6q5GlXFVsWKmus4fm+FFi6QvgpkcuehvJ/xl6kftbF99pKxySP9n2/Ld8Yd9MhpjE6bMxwu6BN8gza9LS9m9AC4Z05zuoF2ufpU9naYoSyjkgp/sP19pbeKYR7ECae7mF0cC9TF9ZZu53MBYpBc5Frg/dS+PZ0vnKx3xwyo6tTyQsChOmwGEYbfwciUqENpOLQ8kLMS0GUAY1sN1aYGFZfIEKbkWzsjOlE8EADvbkknJtXBGiqlveCuXV4WT/k5YAt69yt1eKwRgWbABRgPQEw04t/58tv/6aYkm2eI0nhVgYXtm/aDYLiyTY/9y1875Wu2sAAurGdbD7oH8WVz944SbnA5Br3LwoORlakT7UQXBIdepFqZDcJFVNJSv9B+vdCajRBZtHKpWv29Q1QpkA0/3kNl6rXjj/ru/nzufLB0uIUGnzUPvUHQZKya4DYpWdIQEoVPvnf4XJ/zKNLO1TkBmPuCuDv+QrJTiUXB9CPeaykqdfdN2wI77d1S6iOSvYClNSNAy7qpVrOd2T8vhwhEFIYEmxJzzdt9oc23B+VuaIdYgYGgHXYGJLVULmrM+XLyGVasJaz9ujgC5PfO1/jxh6RT1Kr0QGtH2jpc0ZGl1ZIoBqJKrroVUHbinMLzT8MP6K41db6WhsjIJZZRYRMO3HwiN9/5G3F3Ja4q/2V9OeHWHOU2eP+TX1gyNJ8u2MU6wNkV89NvtkCjxfn9ZcBbsZdenr2RMTIiA6fvoT/0HpXRAsKnUMSMaJyaAXoiA6fvoz13/WDDTCTKR/9CayxDB0sDs/NEHuWw30uTn+tcJ40PCAtDT7Pr5LjvXRVjGnHHpQlPCrbq5v9S/Flxzm/MeE4V4BiYDrVgT4W9Mwhbci+w+lTMwGYoD9AWbul2qF7vOElI9oRAughvWB6fsT3mLRzgCGfzx/rng0bnmmpMRgUBO9F2AWrBSp1PiCRT5y7CfMNMOVQ9UyIOXICFBP+jVo6JsKuAQPVDv9P8LAAD//9l1PqwAAAPxSURBVL1Y2WLDMAhr/v+fl3FYQthO1nVd82BAiMNH3GzHeX6d53k8juMRz2njUBOwERikO6BDkrwoylAdxPPxyfqHzda7sGc0E0IbU1x4EfP7gZlNsXWWxdU6ZE19/b2+TLg3ryXDMzXoy9RPhURADWk7aNPqpwaEXlOthWGALtCr9TnhpS3NqJ0MfeE3DtqFZFBuKWEqtijTsvxT/cNf4Wn5cbijSz/xx9jKaq/NLnk2tl2cyJNZMRuHQu+uzx3OKWgpR9RWPdnNPSDEJNtGPYfgXO7eXENt1V+vHxPWVcyGPeHYr6iTxXz0BztZaEeSJWME2oCXXlyufrJ+7nB0Lu1Hg9YJ5jE1uDNbSDNW9uJ24IghD81CWHPMSAtpRmce+SusYBZORCIHrF7npH3hRFpznzahuquRZbmqmDFDneePrfxFiYQvnBkcsahvO/xl7KNWdrOrIx3Cfy1bvBv+sE56Y2zEpPl4ARfhB03j69JSdE6AS8Y4uztopqtdaXe7KcwiCjjUd9Zfj7QWcZ1bMRwp7vqLLQF7Gz6iTVwuYEzSk2wT3O+6p8czhfNIh38ziw4NCyAkklOmA27IyT1M8YoKboeGBRASZMp0wA3p7rq0gEIyeFWSck1cPTNSNjUokGtZIkm5Jq6eQuodntLlVeGgnwkLwNmr2OlYwQHJhE2hNxRawgHm0p/31h+fliiSJXbjngEUskfWB8V0YRkd65erto/XbHsGUEiNsBp2D+RncdWPHW50GlR6lo0FJi9TA9pHFQibWIeamwaVi6iCwXym/nKkMxgpMmnDkLXq/aBVrtBs4O5uIlut4W/Yn+v7vvPJ1GFSpdJhs1A7GJ3GjKncOoUrPKpUgqfWK/UvdviZNrO0NiCdL+rMDnsTrJDqS8LxItxzKip59k7bBrve36PihSe/giU1VSot4i5b+XpstzQdLhxhUKWiAdFz3u4TbKZNOL+l6WIOKnTNSmegscFqTjPGi4tjWLkasdbjZgsQ2yOfq88dlkqRr8JLQyHKXvESBi2ljgwxBazEqmppyg69h9A9w7BD+pHGqrfUYFmaVGUUX3jDtg+Ehnt9A+6u5NHiJ+vLDo/qELvm+SE/lmbheLAsG/1UxqKIjXqzXCgKvF5fJpwJe9rx6isYjQkQato++lN/oBQPGmQydUyP+qlTAV+AUNP20Z+7+jFhhlPJQP7QmkkXlcGBmPGtDXDILqTI/9WvHcaLhAmgpsnx+S4r10mYxtpx8YJTxCm7mR+qXxOu3ta+l0ZBXh0rAq5II+F/TIKWOieZbTJXx4qQHEqfsLHbpXqx6kwh2VMVwEkwQ/rgkP0rb+BwhyOd/17/G7k9LYas5s1QAAAAAElFTkSuQmCC'

const makeReportScarico = async (firma, ART_ANA, CARICO, SCARICO, id_mov) => {
  return client.render({
    template: { shortid: process.env.JSREPORT_TEMPLATE_CARICO_SCARICO },
    data: {
      IMPIANTO: process.env.IMPIANTO || process.env.DEBUG_IMPIANTO,
      ART_ANA,
      CARICO,
      SCARICO,
      id_mov,
      firma: firma || emptyFirma
    }
  })

  //const bodyBuffer = await res.body()

  // debug purpose
  // console.log(bodyBuffer.toString())
  // fs.writeFile(__dirname + '/reportttttttttt.pdf', bodyBuffer, 'binary', err => {
  //   console.log(err)
  // })

  //return bodyBuffer
}

const makeReportCarico = async (firma, ART_ANA, CARICO, id_mov) => {
  return client.render({
    template: { shortid: process.env.JSREPORT_TEMPLATE_CARICO },
    data: {
      IMPIANTO: process.env.IMPIANTO || process.env.DEBUG_IMPIANTO,
      ART_ANA,
      CARICO,
      id_mov,
      firma: firma || emptyFirma
    }
  })
}

const makeReportMovMultiplo = async (firma, CARRELLO, id_mov) => {
  return client.render({
    template: { shortid: process.env.JSREPORT_TEMPLATE_MOV_MULTIPLO },
    data: {
      IMPIANTO: process.env.IMPIANTO || process.env.DEBUG_IMPIANTO,
      CARRELLO,
      id_mov,
      firma: firma || emptyFirma
    }
  })
}

const makeReportMovMultiploCarico = async (firma, CARRELLO, id_mov) => {
  return client.render({
    template: { shortid: process.env.JSREPORT_TEMPLATE_MOV_MULTIPLO_CARICO },
    data: {
      IMPIANTO: process.env.IMPIANTO || process.env.DEBUG_IMPIANTO,
      CARRELLO,
      id_mov,
      firma: firma || emptyFirma
    }
  })
}

module.exports = {
  makeReportCarico,
  makeReportScarico,
  makeReportMovMultiplo,
  makeReportMovMultiploCarico
}
