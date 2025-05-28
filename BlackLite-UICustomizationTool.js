(function () {
    // =============================================
    // BlackLite UI Customization Tool
    // Copyrights Peter Hauer
    // under GPL-3.0 license
    // see https://github.com/PeterPeet/BlackLite-Tools
    // =============================================
    'use strict';
    console.log('Loading Fixed Theme Editor');

    // =============================================
    // GLOBAL CONFIGURATION AND UTILITIES
    // =============================================
    const BLTOOLSLitedefaultThemeCSS = `
/* CSS Used specifically in Lite */

	/* base64 encoded image resources used in Lite */
	:root{
		--img_nikosquare:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAADxQTFRFS2Si+X5+pmBfHyApLjZSS2SjP057Vzw5EA4Sf1ZT+9Sv1WpqnYx/7qaYw7vUAAAAS2Sj9PPzgnrLS2SjAzrF9gAAABR0Uk5T///////w////////////AKj//yMlHqVpAAAD3klEQVR4nKWXi7KjIAyGFSgxEjhV3/9d90+8onZPd810prWSDwi50fyoTNP7/X79g2D4NJlqo+rvV/Mf8npPM2B6/4+6ihKaB/pGaH4e6IPw00y3+48xhBC3J32Id+NeUzN9UPfer4RoD/eIqbnuwLS7zncLAfqdPvvDmvY9XAE6vuuImEAw8fNT1/kr4Qqw+YhdIocfJl0glxyTvyG8m7MNY1B9diAkmgGUODnH7Km7AF53AGEjUJtWYdUPzn0LyC6AQO0qCUCi1PKXAM5tCwXeAC0ROf36AqA2VACmbQ8yP9DVimeA6lPKkLaW3EPylXAARBXV701OhOVPI6hcAXH1mTyP7e8AMyEc4mQDzP7XrfOfl5D7ndAdfXID6NwMyXACEpEbgPTCLJn1hEGoAep/OKheQiCEEhj1HgBQX1ZxQMPLlyVsABwejkp8EGEQAkxRA4RgIRYhTxme1fkKoBZwAHjLA+b/cgLQ8gZ4gZ+tVtgAnboaa+Lg0IwRhBqAmX0cI0WFqHN3FUAXAOPpzIWhPzZYQgUAu4ljiaKTaKwtZtwAIdv8XkocR9+UYM5/BMTRxzJKsWEu+RPAAsBxKSWWgTHS18cofiwhlCJD4cApUb0CNWKA/5dhwAqKD2UIXAEoFgUMkIJTCCcjzkGE890BQhXA685WQNqD6ujKWDRhhI7EdKUCtKSGxd8ASEr+6sqNApKPeD/iFEpT6nAUcAMgMmBzqwVPgJCd80X3AIlDDcjSzH8PJbD7AGiT020WjfcCN0jI5WwJGk5axP4eikeyvQd4HE5i7I4xEpWANKg0m2p0OUIcQKJnd7uCaABMRebOSOoB1WUVYACzaGSs012NaI5gAC0GcPWD9iLI6/qVdGeXY7R6xu1M0FAhG7s865ctw97Zoz85kuXi5T2EbaZatLileQA+VifrYGrT7ruL+lbZ0orYcXQJpry/tl+26l1s8sOy+BxMqKjr23nf7mhFnktbOgJOGQmnVG0ZVve06VvDUFmEztGIhHAy2YHA+qsCuFNS1T0Edf41AOZ1b7uwH1tYYFA4p3U1owiOOu+AsyxrQ3AIXwrLXtryL4BPpW0rrvMaPgHSx+K6l3cj3Oin1lH6S3nfd+KDa51lAjJhE6ddz7XRu29xUH51O95SgNOahDTB3PPvLc7cZPWYEVlVlp5AkGtJK/63XZoq0jBsvUrPeNDvr/tE1SnD3qxIEVuNfAsY0J9w4Ux2ZKizHPLHFdw127r7HIS2ZpvFTHHbbN+3+2Qm29p9NvXv2v3twkHHCwd9vnA8vvI8vnQ9vvY9v3g+vvo+v3w/u/7/AZoAPJwrbZ1IAAAAAElFTkSuQmCC");
		--img_humansquare:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAAXNSR0IB2cksfwAAAAlwSFlzAAACTwAAAk8B95E4kAAAAB5QTFRFFIqj/v//V6u9ksnUFIqjx+PpcbjHFIqjFIqjAAAAcfUgXwAAAAp0Uk5T/////9z//5IQAKod7AcAAACKSURBVHicY5hRwoAE3DsZWhhQgAdDAaoAO4MDqgALA/lAOQmVzyooaIAiYCgoKIYiICgoKIouIIhfBYYZGLYwKBuh8oHcVAUkfqKgaKCgMILPJggGCFMUIQIIewIhAnCXMAlCgQKqEQhDmGECAegCBmiGws1gYFICA2SnIgEHVC4LZlRiRDZ6cgAAfnASgWRzByEAAAAASUVORK5CYII=");
		--img_favicon_busy:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAB5QTFRFAAAA459F8vrrV2hQWm5T2M2oeo9zWWtS6P3k1evQZQ2NdgAAAAp0Uk5TAP//7xr/5HYRi6G3mX8AAAEASURBVHicjZGxagMxDIY9GNr1hryAwaGd1frWQEQ8x+HuAXJEpbOPmG4ZkwcopG9byXYuCaHQf5I+0K9ftlKi0zl9/RzUVcdX+ny5Bc/fRGd1C05Ex0uDaaHUE31IOXKpPaDGPdGI2rfIIMLoEwC0CbkU4FIEIhog7QsgAuqM7QegYRSnFbhgWHNwyKZKr6S3TTA9oKzV8d0IaIIVCx6BXQEzs3mTEQ+hgCb0bQZuAhYELMUig9kDMH8BaZr/gWLqnVkXUNdysAsowRC2tlqU6HLcuk7k4/SSszOZzq/ncrYhW+Rnzg9AZUL2RLfrOoK0qIC/RtTi9JPaR4B07e/0C6jPUVuNXWqeAAAAAElFTkSuQmCC");
		--img_favicon_normal:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAEtQTFRFAAAA+XJ0l09PsVdXcTw842hqw2hmTi4vMCQlb2eUgWtl+tGpBAMDEw4NPCkoFw8PJBgXt5WBVkxW4Nvf7Lia3Z+MpJnAZ05HnJOTYIS/NAAAABl0Uk5TAv////v//vT9//3/Nna08qf+///////a/hkcROQAAAGUSURBVHiclZLRcoQgDEULBAKoIKjI/39pL4i7nbUPbcYZwJyES5Kvr3/YvIx1nn9zL4G4EwuTXX7xs4QFGEklOT6SBENERguhsWHFD2AVRhL8IEgawY8b5L4fYtg+TSl8+NMEu4G2P34Q67r6I+37dLyBfU/4PY/sInG2MR8vIHG01h9mHfq1hUUQtwYcLEcp+ltmwqutdy5HMwAfc8ExKtVSLEZZW13Jxb4Azq7UHFnFrtGItLliS1UDYOfctm3JhEtlEH5zzpZNDsC63AB1VysY3gqC3C2ytsNW6Q3IjCt91Qr9QK8MiFL4nUEpEyNLYmodxYo3RquVHWUmbbRu0QCbKWwNfil5zYeENrRRqtZrGEQYqdtW8FWHLl4bgZDLFLZdbS/UzP2AEGTufkt3xWSvwzJeh4GxHWD5qlgXOZ/n2ULuC/od4Pk8x9xhCekD0Bqd/DmXgbpEumRgrMPn1K6ecs4pJc/V0nE+x35KtfTJTJufpvPTD2DyNZ3e4wP3zDCHevg+yYvf09PfkHuK7/Vv9g2CjBTdqv3bFgAAAABJRU5ErkJggg==");
		--img_sword:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAA7AAAAOwBeShxvQAAAB5QTFRFAAAA/rUT5uvzztXjq1kW5+r14ufw/8YF/8QHr1kWOCO8XQAAAAp0Uk5TAPr+/fwgpBqRPkYi9G8AAAC6SURBVHicjZCxDoIwEIZv0cLmryTiWl/AhOBOcgubcWAmDs5lglEWdWTwgT1MkGvj4A1N+/Xr3Z8S6VpcrXeurN1799baTIOzCMdQyANBg4+QHQIhq2fhMgqqZ/WfcAqE/LfQPR2REgzwoKUSIiB1uoMA3PWIEUCPMD1arHUG08YFvAz0Ymz0T8XMBWpPYMbWE7hs4L49+4R5aGalAbiU/OkEeiAZBGACst1RAFbjqp/IgA63CUQ6gtQbfGErFF7/nE4AAAAASUVORK5CYII=");
		--img_paper:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAAnQAAAJ0Bj3LnbgAAAB5QTFRF+OmvAAAA89Ze14Rw2cCY1k8/8eGhmEQ/+uqj87Jse3RL9AAAAAp0Uk5T/wD49//9of8rH/vnQeUAAAEOSURBVHicXdG9asMwFAXggx1COmoJ8VgNptkKcmqyGaKSB0i127RkLiTgNV2CVxMo9G177rVSm2ow0se5Vz/Gbdub6YBz2//w0sV59s0wbs5X806X1j4JFN4Bx45La9eE7OM1PANIBHKCuW7CAYgkkIWgEaWeYN5DjHA0AthIZF8ILAgrpBJJ21N1hyGCXXvGA2EJibxJQaVwgUQKlNIkj5AePNKyrWAJtYS952dH6AlpJaQViW3AXc/shlnZFoRHAhd6hpkjrLGEl7lShFKuphXgA0B23WtF+UmwCjy1VijUw70H4iPeH0KaIMl/DKZjIf/lWo/QCJjVSAMYUoSvCH80gjHdEZibCQjJJuYXZ+xAP6Rjil4AAAAASUVORK5CYII=");
		--img_dice:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAAnQAAAJ0Bj3LnbgAAAGlQTFRF2gA3AAAArgAs9O7ptwAu2gI45Fp63y5a8+rm8t3czgA0xgAy3RtM7bG74Txk53qSsQAttQAurwAs8dLU6Yyf3tfT5WmFsAAs2gA3wqqrsBM6uhxD2gA32wA22gA30hdGsiRHt1Rq2gA3GZfQSAAAACN0Uk5T/wD//////////////////3QL3f////+22v///3AK+v///7M1XKlYAAABCElEQVR4nKWT63rCIAyG2xCggD1bD1On7v4vcgnForWVZ8++P22SF5JAyPKEsjy/nA/f2VwOALqmZeDy8xZlWSRk3xJwXowTQQA0BBzY2ujNa5gcPgsBnH/XF6aWMSxrU/Q7TkIA470QotAR0AU5+usEeFuoCCjhV+C0g2FHFYGKbcNVjEBW0xbb5xq2tEHNjQRAalU9xclRKU0OfABr+jsgVVkq+QFQ1I5RH4CS2yv/AyRTJIucKZ7kilzqqDFxWXacB7d63acRALsyMMMtAGgXR244fgUAwC0M7XC8wwh09MHrbOzt6cbr/dg3/APobIw6hCB+OO0+GPgQTPJPL2+bDhYVHm9Cv52hDBGSdP+eAAAAAElFTkSuQmCC");
		--img_chat:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAA7AAAAOwBeShxvQAAADxQTFRFkcPmAAAAkcPmstXukL/ltNbueJGic4aTibLQkcPmvtzwpM7qmazZkcPm5vL5ps/ruNnw0uf1udD/////pH/0JgAAABR0Uk5T/wBl/xH0////Qrz8Bltj6diDAgFfSBG4AAAAzklEQVR4nL3TQQ6EIAwF0BYLSBFl9P53HUFhVKru5i/QpC+2CRWQOOpLIo9YAqQ9tJmqAJbqAFyBFuugK+hk0P0b9Mb05/MCjLUGwOZzexeBuQe9senjdmth2xbykEoFR89gJfQClHsD4eGyMlDAMmCkHYziPvixAhzjvlO+K9FxXShXAOKcB/VMJTPWegaYgP/gLwOVegVTqishO9i2+Bbw/h+Eth7g0LkOdog7AWoBnQDS5RvpuvGcZcjZ4JIWBuXkbvgAkMILWOdx6fEFbukIF0RE9j4AAAAASUVORK5CYII=");
		--img_chat_mono:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAA7AAAAOwBeShxvQAAADxQTFRFu7u7AAAAu7u70NDQurq60dHRjY2Ng4ODu7u7rKys19fXxsbG7+/vubm5u7u709PTyMjI4+Pj3Nzc////jB2o5QAAABR0Uk5T/wBl/xH0//9C/7z8YwZb2OmDAgHH4NesAAAAzklEQVR4nL3Tyw6EIAwF0BbLw6Lg6P//6wgKo1J1N3eBJj2xTaiAxFFfEnnAEiDtoc1UBbBUB+AKtFgHXUEng+7foDemP58XYKw1ADaf27sIzD3ojU0ft1sL27aQh1QqOHoGK6EXoNwbCA+XlYEClgEj7WAQ98EPFeAQ953yXYmO60K5AhDnPKhnKpmx1jPABPwHfxmp1CuYUl0J2cG2xbeA9/8gtPUAh851sEPcCVAL6ASQLt9I143nLGPOBpe0MCgnd8MHgBRewDqPS48vawEIEy7Qd5cAAAAASUVORK5CYII=");
		--img_compass:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAA7AAAAOwBeShxvQAAADxQTFRF/7VV/+J5AAAA8/P11Ob1l8jt/39K+chs/9tn/8Bd/+J48eTO/9x0/9Zv99ugiHp0/5MKWVFO/6k53KWUcJJTdwAAABR0Uk5T/v8A//////8Zydn/klf///v/bf9A3eYXAAABMUlEQVR4nG2T2RaDIAwFUwEBWdz+/18LuSypNS8enTGQQGgZ4VKMW4kYHb9fnnxaaOC4fUZsxbmoxHFRx5/f2BJRkY4Dgts+f2F9AU0Q3Aol9Qyd56DUvisVMlw6Dt5D5wVDKArzusdaBfaXlZqCUrlyiksRnORKt6dioRRCSND5CK1Z8Au5vn5Y1yy4zkhBaSRYS9yh85YiURwF3CtHbhwpPHGN/FuAsN7gOjwF1bhpAtYg7tnO5Wdww8Z+nn+CapyFswtiibJN5sbIJaQQGjdyk7PMWr8RRisziU7zj0OwaBRaPTkU0ep5WPo3+mGN437wedxIYS2+n7vkvl4YvnLl3Qb0Z1TICRZcWvg2Q8B1A8dkJXqNtHTh3cCE9tHzT+zB5/Am/4aFUAe4OT66+fULsfQP1birKzkAAAAASUVORK5CYII=");
		--img_websearch:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAN1wAADdcBQiibeAAAAEtQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////g5kLBwAAABl0Uk5TAP8Ds+QtpRpgIn35Ud7vnMFxhNZFkswMPA2JIJgAAAFISURBVHicvZPbjsQgCIb5PdVT1dpW+/5PutTZncwp6V4NSasGBD4BoruI6E1LqRkfBb1LX2bcZV76i1r4dCoS1hW3nX/y0uW4aBbUiiWPg3xwMjU+Fxgy2DZedhS+0aa7Xp23MXeaQ+9BUV/5CKg/C7b2nKFxEwpRgZs4iPLs9aa3QKVtJA8Zo8TA2agCdgRIkIIyrJXhl7LYiExCIk30FdFakHbUtXO6k9MPO6H1gDxOdgvPiYoURMTu4alh0gN0wcKMLkNHVA0cFZuG6QxpB6eDqSXYdaYeyrIqL5MQao6p5R0Dc22lthx2jqZMlvwjfpZc9lbayHIPYdsTjjNaslx39hu53jYkPww2JE4siTPamVjgOveAYwL0MBAMeX4D+RftBq+/89D/KfdVw1y33HXTXrb99eB8Gr36OsBPw6vehnd4+Tj+P8K7EihG+ntRAAAAAElFTkSuQmCC');
		--img_save:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAAnQAAAJ0Bj3LnbgAAADxQTFRFQlFtSVp52uHyws7lztbmjpmuUdjlu8TZeIminqi9WvH/rrjNVMbYxuT0Xm2HAAAAR1h3RVVyR1ZyR1h2eZplWQAAABR0Uk5T////////////////////ANT0HUjqAr+PAAAAgUlEQVR4nI3Q2RaDIAxF0RuCDNUWKP//ryXFWkUczmP2ghVAjkTklOQAvLT28R1CgMwbQCoC6oBIH4ocAOIR4BYoZtZboOHbKHlaQw3rTsFNNVObFjCP2gzmGvhZ47k/qOUdW7An4IdfDbAt+dLYgJbkR+zdq/YnYn+rhBxT2kPKH1FvCKEBnt/sAAAAAElFTkSuQmCC");
		--img_save_mono:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAAnQAAAJ0Bj3LnbgAAADxQTFRFV1dXYWFh5eXl09PT2tram5ubnp6ejY2Nra2tysrKrKysvb29lpaWW1tbcnJy3d3dAAAAX19fXFxcXl5eL2vTkwAAABR0Uk5T//////////////////T//wDUHUizGkTXAAAAgUlEQVR4nI3QURKDIAxF0RcCAlUqlP3vtaRYq4jW+5kzMAHkRERWSRbAU2uXXjFGyLwBhCKgDoj0ocgJIJ0BboFiZr0HGj6NkqMt1LDtEuxUM7VpBfOoLWD+A881XvqBWt+xB38BbvjWAPuSK40NaEl+xN+96ngi9bcKyCmEI4T8BipnCJv9iKHqAAAAAElFTkSuQmCC");
		--img_load:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAAnQAAAJ0Bj3LnbgAAADxQTFRF8MQZKbmZ8p0fAAAA8bIc8MIa8MQZq7NIKrmY7cQa0sIs8d2BebRn87wcLL+aJrmZ//8AdbhpAP//c69phZ/jMwAAABR0Uk5T//3/AP+y8v6kbP///xcZUAGrAUn40tQBAAAAp0lEQVR4nHWSiw6DIAwAy1peojLd///rKm3ZZOOiCXLpBRIhB2CCf+JeXUr1RAECATGQ+WN3TFUBKsJmJu0ijOCZo5m7EJzVRrE2c3ZBhoiXCXoYsYm4qejbUSbWo94HXCfZALXF0kVWQVAKP6Xo/hK0RHZcmVnAa+lzketYESBb6dvwPmxDqdX49TiWlIw/JeG6+ViCVsJZCWclnJVwVkLwfwau/+INBncEwpxiohQAAAAASUVORK5CYII=");
		--img_delete:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAAnQAAAJ0Bj3LnbgAAADxQTFRF////AAAA////////////////////////////////////////////////////////////////////////npt1BAAAABR0Uk5T/wB3M/ryVkUE3GQ8bhvOlb+s6oPyVnGNAAAAt0lEQVR4nHWR2RaDIBBDGXZlVf//X8sMsQtt88BxuJpIUDTVrBLZhg1F0WutL/XUNUYfB/Dqh/Z/wA9AbLVIrIjMlySc6FyNHMC2gg2grqAC9BV0gIOHs4+z2y55B0DjvELJuUDFLYDzUsCfNAApKs/ustQFkFHP0C6PGkAmxz4j536HgdQYplWwUuEEAeF7xmkDgOGbSxyVo+EvEkCZzT0XZT7AmwpAXEEEWOutdANT7WvbVo6gB7iKBNvL+guBAAAAAElFTkSuQmCC");
		--img_delete_mono:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAAnQAAAJ0Bj3LnbgAAADxQTFRF2NjYAAAAnZ2dRUVFbGxsg4ODg4ODjIyMXl5ejY2Nd3d3iIiIsrKyfn5+ycnJe3t7kJCQhYWFj4+PpqamFCC2sAAAABR0Uk5T/wD///6X/0j///tu/7z/3gaFJ5RWfO2aAAAAw0lEQVR4nIXQ2xaEIAgFUEA0b2mX///XgaJZ5jzMeVJ2CxLAOytbVisAbsV7fxJYSG6+bAIlEVGDb5pc0/7AlFQEUFtNuVohLj+5hiNymGOQYUo26DP0f7DquzKHWhNnfek6QHYuhhCdyxOwE5G64wG8LIRUtC6t2mmw64X0cxd1a+QHqOGGUAV2g5IAUrxbRT2XAa7hfA//whIApBOT/EHU87PEI+sMptaIdcYLXjs8DDZ+A28G2OtYrx0fWDoP6ToCP5HeB/Sxx091AAAAAElFTkSuQmCC");
		--img_download:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAADxQTFRFAAAA////////////+f783ffv/v//3ffv3ffv5Pnz8fz56vr16/r23ffv9v377/v4////3vfw5Pny3ffvbBfD6AAAABR0Uk5TAP+TRfsGWm8m6uDv0U/LfyiIepVDO0gQAAAAbElEQVR4nNWPuQ6AIBAFF+S+j///V0FjWJTEwsqpyEzxFoBXKGnQvwcuQw9B8kkLIRzrgbn2ROGQFwwFbYe3GgUfR4gejyRqzg1D0+2q2gszdb6ql9x2bH54AFW0Lmrxc1BSPvw2gQKZ+BQW7MaRAtfJQ2l0AAAAAElFTkSuQmCC");
		--img_mic:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkAgMAAACcbnALAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAxQTFRFAQEB/f39W1tbsrKyhr4L4QAAAAR0Uk5TBv+O8t7TK14AAACVSURBVHicY2BAAatgDK7/C6As3dAKKGtqaByEwXQ1NLyBtizuJiCr6QGQxXsIyGouQGU5AVmNIBZ3EpDVCVLHXTA1NIwXxGKO2Boap3oAZFycduiLrWADpzfta7oGtsP0AQN3DMRrdau2QjzHFBoaCnEBw9bQKKh/maY1wIJjGgM6i+n/9f8Yrt///x9Ui9aqFQzIAACxbkd5KhPnwgAAAABJRU5ErkJggg==");
		--img_mic_live:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkAgMAAACcbnALAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAxQTFRFAAAAHvoBSldJTaRCcSDH5wAAAAR0Uk5TBv1875jbENYAAACVSURBVHicY2BAAatgDO7/D6As3dAKKGtqaBiEwXQ1NLyBtizuJiCrCeQG3kNAVnMBkMUKZgWAWE5AViOIxZ0EZHWC1HEWAFm8CUAWc8TW0DjVAyDj4oCu3wo28HrX/0XXwXaYPtDgj4F4LXzVVYjnmENDQw9APLc3tA7qX6brDbDgmMaAzsLq+v///0O1rFoFD0owAADWKEefP5UQnwAAAABJRU5ErkJggg==");
		--img_mic_off:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkAgMAAACcbnALAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAxQTFRFAQEBoKCgW1tbmpqa1zTSqAAAAAR0Uk5TBfGLNb6PCuwAAADJSURBVHicXdCxDoIwEAbgi4YBjeEpGHRnNzqbOHgtMSRldOQFCFAnHwBmR8M7mPASfZSOJN7RMmCnL7n/mrsDWLx+xgbfEA2sGFNIjqwWBRjWChGfOHh9M3CSpvBSU5E1SnCStvDyRVIpvaStaieF46RQl9LqnBScrMLmyjqb0esirVNolcEX57amRBGwIiqKmAdN1B4fLX9oKt1pQVijzSG8kXZZLPo25VjBe3AsGWjLOw8Q0TBdPZ+jg3/NHQvRhXzLof8sDvsDMJVHBpRtjD4AAAAASUVORK5CYII=");
		--img_chat_cust_btn:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAA7AAAAOwBeShxvQAAAB5QTFRF////AAAA////////////////////////////////+ZDkTwAAAAp0Uk5T/wAM8dK2SHAtiuAmg50AAADMSURBVHicbZFNEoIwDIUztjjjMvUH3VlH0SXeAPECegPLDeQGsHHLcGJNWxqmmAVJPyZvkjzAKMB+LxpRtQzOeYl4FPUANjnIKitAGA868LHwIB8ANA4UMQgtwrc8IqBijVN4Q0ngQ5pJlVGjrBFS++uN6AoDa0oJDtpPWFGaE3hRdYMlpRmBPVXXKZi0OFHNolu7Wo+4s8MbQNXxYElLo6c8eu+WC/cQOlpfxvfwQLGG/g/sTeUd2AYyqvmNE4xyVqZspTMbDyP3R/EFHDwlDSXkmSQAAAAASUVORK5CYII=');
		--img_chat_abort_btn:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAA7AAAAOwBeShxvQAAAB5QTFRF////AAAA////////////////////////////////+ZDkTwAAAAp0Uk5T/wAGyhCtf+a2XPn1V7sAAADISURBVHicRdE7DoJQEEbhkxh8lJcYewqtLWgsDRswrEArWytqwgpM3LDM/DNAAcnJR3JnLuU3NCWe+n0rnGDKcIYXX6iC1A848AH6BbDzIGJgDvYWMUBFRxAHtByv9p0CbO4UJ/smQKEECTCHIKOABZEAFkQCeEhiwEMSAwoiDhTqUWdZwlm/TBl0yCCsQIQViJBj5tDkHmLoOcSYuRdyD7kXcg9x3J7nMoWTrV+DpnCie2l1UZ2HZwKRLZcFOOmp39U9w/ExNH9CeSgHcv95sAAAAABJRU5ErkJggg==');
		--img_chat_send_btn:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAAXNSR0IB2cksfwAAAAlwSFlzAAABigAAAYoBM5cwWAAAAB5QTFRFAAAA////////////////////////////////////JHyblQAAAAp0Uk5TAP9vDPYrvduISRPAj7AAAAB4SURBVHichdK7CcAgFIVhVzgg2scFbLKDpZAZQkibFUIWiGTfQArh/hax/EDv4+jcvCVnzq3QDExSqQAdGaA1A/wJUGwAhQpQyYBeqoP2DPAXQDEBFBbAV8qAnj/gFT7KskNjbJ3DcXwuiCsclswYGJSNcggb3+EFzkgkYRPincoAAAAASUVORK5CYII=');
		--img_corpo_send_btn:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IB2cksfwAAAAlwSFlzAAE69gABOvYBOrFXOgAAADxQTFRFAAAA////////////////////////////////////////////////////////////////////////////2EloEwAAABR0Uk5TAP+Ns8QMEdZ1KgY6hEGpWfHSYnJ1JXggAAAAjklEQVR4nO3SyxaAEBCA4VG6KNLl/d81xUwMWbZqFo7T/y0cAkjHzFCbfhNCdpU+CFETvr8L7G/i6WUR95JIey545wL7SksqsI/ttTYNF9TBA+Biw46AhO+GOgEU6gYz9QcE4QFItz0gBbdYwhm6XYe/IAJgtJ2y+45BcX7wGdAXsBUwuZdf8jeMRyn24QQTAQPJbL/N8QAAAABJRU5ErkJggg==');
		--img_corpo_abort_btn:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAAXNSR0IB2cksfwAAAAlwSFlzAAABFAAAARQB+zng/wAAABtQTFRFAAAA////////////////////////////////600+wgAAAAl0Uk5TAAMbfdr6//TxAeIJjAAAAFJJREFUeJxjZEADjGQJCCkpCUDYd+7dBwkoJz+AyjKdOgcSsNCDq5etBQm4KcAF/s0BCZR9QJg4EySQhmTHrGEvgOF9jADCCEKMQMaIBlRAhgAAIUIkIRvVXjIAAAAASUVORK5CYII=');
		--img_corpo_edit:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAAnQAAAJ0Bj3LnbgAAADxQTFRFAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZa/DskgAAABR0Uk5TAP7x64ADDhfktXFmeJMyotNKwj87K0aQAAAA70lEQVR4nLWT3Y6FMAiEC6W2aH/U8/7vurTVNWvRq7NzYYhfgGGMxvyPNg4YeHvkxUJVIB07QsC97AhBn0EWbMo+JwR+mG/JS5F3CMr8GQE419IXwIFPc/X3PKFy5L7DKx4an6fqknJ93q7wnfc7OAAWhS+uXSpOAZMb5y9HzcLphS9yS/nLXby4W3DodxHP/cZonA7/J4/TwG184ZKZjf7af9S/ootPGjcsmbxxs8K6XVnc9tfXAbg1taxp4OaD0FL3Navb/d2jRGCc31LQuXi0aU68jvkdkkZbP+/wfU91GFbW++VK+cvoM5r/ln4AY8EH0Qkc978AAAAASUVORK5CYII=');
		--img_corpo_retry:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAA7AAAAOwBeShxvQAAADZQTFRFAAAAmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYB0vbbgAAABJ0Uk5TAP+OCnz5/ZjdwtU8JsqwVWW2UONGYgAAAOZJREFUeJy9U4sOgyAMBFosguj8/59dAXmOuWRZdokJXI8+8BDit9geiI/tXdR5LSO0d7PDRjYwL2lwYXoxJ9Fu4hIFrCuUOIXM6toDhVoKpcRynglf5QIsE/yp3B4n3fuSZ2wlC7g/PzZlG4Hj+tBFARU1grXmEoVpS2i5wFxwpHx8L0MDXCLguLbKzq72H3Amz3bEjnCYJFxfoo5rprWPwyJ1Wqm5gAoTBTSWAP7lrhHYsUVbuVTi7OM7m2qrguiP1jBe9nbCkEVTb7kqD+a8TLsTndm0AzZ7b3vx8eGkNLdP70s8ASe+BWpoHN76AAAAAElFTkSuQmCC');
		--img_corpo_delete:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAA7AAAAOwBeShxvQAAADxQTFRFAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZa/DskgAAABR0Uk5TAP8ZE8/k2cbhH56BdA9kAixGQ1txX8NpAAAAuElEQVR4nL2TyRbDIAhFAxqTOiQd/v9fmzikgNhd60qQd8F3dJr+s54+JpkzMdzb/gEAzvBznI9kq/DHHhZWgfbMhRqFM2CMrAfYWrsVOKPowSWRWJHpaVMsDItUrwyVGYqeMVQ9Zeh6whjoCWOgpwxd/7k/zDg4v1rY2zd9ZigV7f5lDtdVXP7VQskg/qHGYP4rDOF/xzDSf8nw/ZMrDF9DO3q0S42i4n9mxBrsm/JxUvSvXSZ/s96e2ATDYcXDVgAAAABJRU5ErkJggg==');
		--img_corpo_theme:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAEtQTFRFAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZCNPppgAAABl0Uk5TAP9EmbvlZocD/vsGPIjPfaJbLtdJl+Y6R35RHH0AAACySURBVHictZPJFoMgDEV5WoqA89D6/19aLIg1yaq1d4OPc48Jk1IX4JsHIrrxLAYaHBgWAxrP9K8amsUAkKttnyReIlhUaaKClYQJXRHpMEnCYPOy7CAJquhvkb7gLXEEYTRlxIyiMLvcg5slocVyjyxolXIfq3bvkcwcfrn5vCipKHR17vmbha9531ZRIDvPBXJ2XCCnz4V/XDmNOk2ka3+KAXN+KSQGvNH7WzOexd95AaOkBtmsQk/EAAAAAElFTkSuQmCC');
		--img_corpo_clip:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAA7AAAAOwBeShxvQAAAC1QTFRFAAAA////////////////////////////////////////////////////////oUirmwAAAA90Uk5TAP6GZ90GEyLL6J1QL7RBWlveQAAAALlJREFUeJxjYMABghtFliPzeRoFBQVNkQRSBLt0Jwoj+KwXhQNYTwgeQOgQXMrAwDdxAVyAGSx5cQKUW6HKJBjA3hSgKAAVMHRjEmRgFikYLgIJTCIJSALcgst3yiJ8u3E660VBQTmGhbDwOCjNkCsoacra2AAViJQIYCh+ysAnaAAPQFUQdVIkABbmjUIJwDBuRETDScHushxFiDpILDQKTpkoODkALsBQ5CgoKPuUAQnEaSknMGAHAC9ZNIJ+mLnNAAAAAElFTkSuQmCC');
		--img_gear:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAA7AAAAOwBeShxvQAAADxQTFRFiYmJAAAAiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJ1owGHwAAABR0Uk5T/wAOBObNRLP0Fih22YC+ZVE1n4prfQ+hAAAA7UlEQVR4nJWT2xaEIAhFEbxk2v3//3WsmUCLVmt4It15kCNgXgIkpZ4uSQNgsuDinkUHNuEVmC2UyDPinPfM+hYY4BZbA3R3APoacG/Aet+35h8ArSKxCEBB2QeHP6CfuMTgI3qm8xR3YJJ/0lc28UI3F2Dkz3C2VxTHAmT+OrtrPC/lAkgT2SAUDR2IDSAteJCoiqRbkaEAixg10MV7uxydRF4JHqPnI8NCpxdVsyRWErNIMavD2m7FLde8h/EFQO1N1hJR2YdYS/BFszsPG5oajD/u4cpLxu1o0WVw6tEzqbOJp1MbXkPa8D7FB+prBiyq3W6BAAAAAElFTkSuQmCC');
		--img_corpo_left:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAAnQAAAJ0Bj3LnbgAAADxQTFRFAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZa/DskgAAABR0Uk5TAP0C1vSFKA1oFwjrPK3DS6DRtVwhct1aAAAAhUlEQVR4nKWRyRIDIQhEaXfFZdT//9eY68CkkgrH1w3VANF/ZYK3Pv4gHM6wQeGXA/uscD48mBuP9YKz0l9qY8yUFb/Kn/wUuoPdUXAKDPQqN6OYLLBqkUp+K63KWSbuqfeYnCZcG8q0kqbDHEq0Mk7ovrWefZQlz35Sj8VNnJE+vPabegE7dATMPe9UFwAAAABJRU5ErkJggg==');
		--img_corpo_right:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAAnQAAAJ0Bj3LnbgAAADxQTFRFAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZa/DskgAAABR0Uk5TAP0C1oUoDfRoFwjqPK3DS6DRtVyphxJ2AAAAg0lEQVR4nJ2RSxLEIAhERVRE/ES9/13H2QYyVRmW/eyiW5z7b1LAEP0bEBHEJBwE6DKIj4eIRY4HCa6atIfzBGm1PJBHD5metBGoR6NO7QCiQakLALNa4mv76my+nzvdO5bRCGbmm+7TOFFnVlHL7ifo0BXiOvrWuuMma+jP+HHBN/MBKVwEvjDYz2QAAAAASUVORK5CYII=');
		--img_theme_1:url('data:image/png;base64,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');
		--img_theme_2:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACIBAMAAACSHv1FAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAB5QTFRFEBQiKzM6O3+5HSEmSkpScGxzqJCMusLLKFN2HJEVZFN6bwAABfBJREFUeJztms9v2zYUxyUoLnoUQTrrcckK2EcRcocezYk0dqwQUt2OxUwKO85oxGsTDKj/gHVY/9u9RymJ06KrYzFAg+UFES2J/ojv8YfIr5n8dBrV5skjMA5wtoGD9xuPhud+59PGz24ubr5I2gDEXwH9LnDzGdDvA4QsG/9wYvg/Az7bRrWLpEiiWvZAgJwQUnKaxwIujGn8uVE2QmkDUBnTds4Ys4wDzJQ23neakAg+XwE759ZCLSMBpQRgZ7U5iwNMAOictdr9Fg3YON9Z08YEOmN1E8lliOFr55Q1sWKYKdV6B2WUsYAGmqFvO71G4GQqhTFreWA8r4Ft263XCHnSNKptXDMK2CDQ6+mVy+ww2DXQNZ3voIQ6UtdLoSO3tnE2DA4TLZUUQgabylpL0Z8qWYUPTGu5rPCcCYKZGB4rXe0AoScbY617hUCjla61MlobqQxUkLaqNgaGpFpqbbX6BdoXXIBLGrIZPVVw88zUO0DnWgCuAzBJrhz/QgBS6Arl11x2HoDOocspJYyLM8opIZyVnHHKeI4nOK4vaM0wZaRkhJIjki1KQjmpPgF6AELTDu0QfJFvnLYNpPiY48bY2jTgnVxbW1sjrQUfZdM09shMoMdqY28BM+9aBGrVl5ASXlBKS4rvGV7ykvKcVJTzRSk43mWcp5zDxxIOmI3y4jbQth2TXscaYFO/9h0hrY72CmgD0NU8HrA7p9xpGQvodXde8iYe0OnubUmiAt1bwlbQReMAk5V2aNFKmKQwAhhnBB3PezDzwx0rx9g1cDjHcJIxlg9AGOAoDmqkCHPZw40OQPi0KGGghCdEA2q3rmMCF9Cuz3k8YLkCYCd4NOATNnWOHccr4YsGXlFqXSEQ3u1iNHDhcMZ5Hlz+rvVvRgOZWcHwoPsYwnxjNPCFQ5dtvEo5xrmNcyGGTGoiGYNyakVCIuW+Rb6pZWcVDLKhhFPrZGMaZ7Rr7LTRa2vcvkG9BtIfYcbuaO8yYwL/IJIwURNEsP2DutP1TGPeROwphDqz+iNmXyYw+Yk62gwWC3g9TCeRgDs2Dph/DsxGAYt7e41mkYFHMNR0VkodCwirl9cos9hlPOD9yCzRhKAHI7PoqDJLaweZJU0SmtP8S2vRfYC3ZZbJyggIgBmjOQSZpRlklgms1F8zdajkciOzwCpgfXZ99WDblVm0RTdTnsNym/e3YZKbQ1CLLDwEnwNz0jx8L8Mo8zQJUcf/LL8BDjIL62OojVHMTGEqgX/QjV5JBS1LQSyCsqFRf4D7qDtAXnMsYTkOGW+ArkFdxK/1Ep8FcxGGi2w44muUCFH1ox1nKQkvVHizQh5BBeoignAhQsbiCjjILNAQl4fHbjeGQWaxKLOgy0fgVK6DHgNVLXFWAhM8KJKSQldGSqJrCeekV3ZWL7SmRuOEZaeELug2vcwyUVoLVUNcpkadaQNYUyuja4WHysCJVkJpCGUN0YRom0opvJvfAHdllv7qYGXfX/pjmmefdJ88VPtgyx2Xd2WWFKoCa4MJWR8Q00FmCcBeGJ80GluCha64PhCY3pJZ0pubhyx371NmaXVEmcWfU+K0+GZllvabl1kaWAFYF6+EyZGwQWgn43kPUWZ5BD4CH4HfAPCua0n6VeCwC2J+2afPh/RkSC8+9vbXsMvh4qvAy9vA+fDF50N6MgD/uRNwE4CzzSwAQwrAGV4/+fjhw+/mAwJnuGlnDyDk8z4AcbPNvN+Bg8Cw9+bko2t+dU0A+v2A+7j89x1djhrDYWvKnz8PW0u2n6QDkAznIgD5fzQseTer7rGnjPoNoCxuA5/RJB0HLIuX8zx5ti36Ced2W9CRwPzy9Ifs/em7AHzq5+8oHwd8OdvMn878SQC+nCGQyapChVjIw4D+9KmfzfsSbrc5LWHswQP+0HuAcSzhe39xFcOEHkLZMYjh98nlEMMkK8bWMi/SC/wl+Z7aIS8zSmHdVhJOiwxvl2VaFkWBUc2yu3UlBOIClnG5oCSVFV/gPgOGR6hvJhhbHtb1Yln2Ly/TwWyxhPWeAAAAAElFTkSuQmCC');
		--img_theme_3:url('data:image/png;base64,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');
	}

	/* Global appearances */
	body {
		background-color: #303030;
		background-image: none;
		background-size: cover;
		background-position: center center;
		background-attachment: fixed;
	}
	hr {
		padding: 0px;
		margin: 0px;
	}
	button, html input[type=button], input[type=reset], input[type=submit] {
		-webkit-appearance: button;
		appearance: button;
		cursor: pointer;
	}
	.invert_colors
	{
		filter: invert(1);
	}
	.unselectable {
		-webkit-touch-callout: none !important;
		-webkit-user-select: none !important;
		-khtml-user-select: none !important;
		-moz-user-select: none !important;
		-ms-user-select: none !important;
		user-select: none !important;
	}
	.flex {
		display: flex;
		align-items: center;
	}
	.flex-push-right {
		margin-left: auto;
	}
	.justifyleft {
		text-align: left;
	}
	.justifyright {
		text-align: right;
	}
	.hidden {
		display: none;
	}

	/* Outer container */
	#outerbodybg
	{
		z-index:-1;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
	#outerbody
	{
		z-index:-2;
		position:relative;
	}

	/* Responsive containers */
	.maincontainer {
		padding-right: 4px;
		padding-left: 4px;
		margin-right: auto;
		margin-left: auto;
	}
	@media (min-width: 768px) {
	.adaptivecontainer {
		width: 750px;
	}}
	@media (min-width: 992px) {
	.adaptivecontainer {
		width: 970px;
	}}
	@media (min-width: 1200px) {
	.adaptivecontainer {
		width: 1170px;
	}}

	@media (min-width: 1200px) {
	.clampedcontainer {
		width: 1170px;
	}}
	@media (min-width: 1800px) {
	.bigclampedcontainer {
		width: 1770px;
	}}
	.centeredcontainer {
		width: calc(100% - 662px)!important;
	}
	@media (max-width: 960px) {
		.centeredcontainer {
			width: 33%!important;
		}
	}


	/* Viewports */
	.normal_viewport_height
	{
		height: calc(98vh - 240px);
	}
	@media (max-width: 534px) {
		.normal_viewport_height
		{
			height: calc(98vh - 260px);
		}
	}
	@media (max-width: 342px) {
		.normal_viewport_height
		{
			height: calc(98vh - 280px);
		}
	}
	@media print {
		#inputrow, #actionmenu, #actionmenu2,.topmenu,.lastreq,.corpolastreq,.cht_inp_hold_outer
		{
			display: none;
		}
		#gamescreen, .chat_msg_history
		{
			display: inline;
			height: auto;
			overflow-y: hidden;
		}
	}
	.aesthetic_viewport_height
	{
		height: calc(98vh - 160px);
	}
	.aesthetic_viewport_height.withmenu
	{
		height: calc(98vh - 198px);
	}
	.aesthetic_viewport_height.withtyping
	{
		height: calc(98vh - 210px);
	}
	.aesthetic_viewport_height.withmenu.withtyping
	{
		height: calc(98vh - 248px);
	}

	/* Top nav menu */
	#connectstatusdiv {
		text-align: center;
		font-size: 14px;
		font-weight: bold;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100px;
		color:#cccccc
	}
	.topmenu {
		background-color: #757575;
		padding: 8px;
		display: flex;
		line-height: normal;
	}
	body.connected .topmenu {
		background-color: #337ab7;
	}
	.nav-link {
		color: #f2f2f2;
		font-weight: bold;
		margin-right: 5px;
		background-color: #828282;
		border-radius: 5px;
	}
	body.connected .nav-link{
		color: #f2f2f2;
		background-color: #4787be;
	}
	body.connected .nav-link:hover {
		background-color: #4db4ea;
	}
	body.connected .nav-link:focus {
		background-color: #98bcdb;
	}
	.navtoggler {
		background-color: #337ab7;
		border: 1px solid #bababa;
		height: 45px;
		width: 60px;
		border-radius: 6px;
	}
	.navtoggler:hover {
		background-color: #4db4ea;
	}
	@media (min-width: 768px) {
		.navtoggler {
			display: none;
		}
	}
	@media (max-width: 768px) {
		.nav-item {
			margin-bottom: 3px;
		}
	}
	/* Hamburger decoration */
	.navbar-button-bar {
		display: block;
		height: 2px;
		width: 42px;
		border: 1px solid #fff;
		margin: auto;
	}
	.navbar-button-bar+.navbar-button-bar {
		margin-top: 4px;
	}

	/* Buttons disabled modifier */
	body:not(.connected) .btn-primary {
		background-color: #757575;
		border-color: #4a4a4a;
	}
	body:not(.connected) .btn-primary.focus,
	body:not(.connected) .btn-primary:focus {
		background-color: #5c5c5c;
		border-color: #292929;
	}
	body:not(.connected) .btn-primary:hover {
		background-color: #5c5c5c;
		border-color: #4a4a4a;
	}

	/* Settings and Context menu */
	.settinglabel {
		color: #ffffff;
		display: flex;
		flex-flow: wrap;
	}
	.settinglabel input {
		width: 6ch;
		background-color: #1a3364;
		outline: none;
	}
	.settinglabel input[type=checkbox] {
		width: 3ch;
	}
	.settinglabel.miniinput {
		background-color: #ffffff;
		color:#555;
		border:0px solid #ccc;
		border-radius: 4px;
		width: 100%;
		padding: 2px;
	}
	.settinglabel.miniinput:focus {
		color:#555;
	}
	.settingsmall{
		font-size: 10px;
	}
	.settingsmall.widerinput {
		width: 8ch;
	}
	.settinglabel input:focus {
		color: #cdf;
	}
	.settingsmenu {
		display: flex;
		flex-wrap: wrap;
		padding: 6px;
	}
	.settingsbody
	{
		height: calc(86vh - 94px);
		overflow-y: auto;
		overflow-x: hidden;
		text-align: center;
	}
	.settingitem {
		width: 50%;
		padding-left: 6px;
		padding-right: 6px;
		padding-bottom: 5px;
		padding-top: 5px;
		display: inline-block;
		border-bottom: 1px solid #465d73;
	}
	.settingitem.wide{
		width: 100%;
	}
	.settingcell
	{
		padding: 3px;
		width: 100%;
	}
	.settingsdesctxt
	{
		width:100%;
		font-size:11px;
		color:#ffffff;
		padding:3px;
	}
	.settingminmax {
		display: grid;
		grid-template-columns: 50% 50%;
	}
	.settingminmax div {
		font-size: 8pt;
		color: #ffffff;
	}
	.inlinelabel {
		color: #ffffff;
		display: flex;
		flex-flow: wrap;
	}

	.inlinelabel input
	{
		border-radius: 4px;
		background-color: #ffffff;
		color:#555;
		border:0px solid #ccc;
		margin: 4px;
	}
	.inlinelabel .rowitem
	{
		padding: 4px;
	}
	.menuinput_multiline{
		overflow: auto;
		background-color: #404040;
		color: #ffffff;
		resize: vertical;
	}
	.menuinput_inline {
		background-color: #404040;
		color: #ffffff;
		resize: none;
		overflow: auto;
		display: inline;
		width: 100%;
	}
	.menutext {
		text-align: center;
		font-size: 10pt;
		color: #ffffff;
		padding-top: 10px;
	}
	.box-label {
		color: #ffffff;
		padding-left: 10px;
		padding-right: 10px;
		padding-bottom: 5px;
		padding-top: 5px;
		display: inline-block;
		font-size: 12px;
	}
	.context_tab_container
	{
		padding:3px;
	}
	.settingsnav
	{
		margin-top: 6px;
		margin-left: 6px;
		font-size: 12px;
	}
	.settingsnav>li.active>a {
		color: #0063ff!important;
	}
	.settingsnav>li>a{
		border-radius: 8px 8px 0 0;
		padding: 5px;
		padding-top: 6px!important;
		padding-bottom: 2px!important;
		color: #666;
		background-color: #b1b1b1;
	}


	/* Save menu */
	.saveloadpopup {
		width: 660px;
		background-color: #263040;
		margin-top: 120px;
	}
	@media (max-width: 768px) {
		.saveloadpopup {
			width: 100%;
			background-color: #263040;
			margin-top: 120px;
		}
	}
	.saveloadgrid
	{
		height: auto;
		overflow-y: auto;
		margin-top: 4px;
		padding: 4px;
		display: grid;
		gap: 2px;
		font-size: 12px;
	}
	@media (max-width: 340px) {
		.saveloadgrid {
			font-size: 8px;
		}
	}
	.btnicon-save
	{
		width: 16px;
		height: 16px;
		content:var(--img_save);
	}
	.btnicon-load
	{
		width: 16px;
		height: 16px;
		content:var(--img_load);
	}
	.btnicon-delete
	{
		width: 16px;
		height: 16px;
		content:var(--img_delete);
	}
	.btnicon-download
	{
		width: 16px;
		height: 16px;
		content:var(--img_download);
	}
	.btnicon-websearch, .btnicon-websearch:active, .btnicon-websearch:hover, .btnicon-websearch:focus, .btnicon-websearch:active:focus
	{
		background-size: 80% 80%;
		background-position: center;
		background-repeat: no-repeat;
		background-image: var(--img_websearch);
		background-color: #15a0ad;
	}
	.btnicon-websearch.inactive, .btnicon-websearch.inactive:active, .btnicon-websearch.inactive:hover, .btnicon-websearch.inactive:focus, .btnicon-websearch.inactive:active:focus
	{
		background-color: #6a6a6a;
	}

	/* Help tooltips */
	.helpicon {
		display: inline-block;
		font-family: sans-serif;
		font-weight: bold;
		text-align: center;
		width: 2.2ex;
		height: 2.4ex;
		font-size: 1.4ex;
		line-height: 1.8ex;
		border-radius: 1.2ex;
		margin-right: 4px;
		margin-left: 1px;
		padding: 1px;
		color: #295071;
		background: #ffffff;
		border: 1px solid white;
		text-decoration: none;
	}
	.helpicon:hover {
		cursor: pointer;
	}
	.helpicon:hover .helptext {
		display: inline-block;
		width: 260px;
		background-color: #1f2931;
		color: #ffffff;
		font-size: 10pt;
		font-weight: normal;
		line-height: normal;
		border-radius: 6px;
		padding: 10px;
		margin-left: 10px;
		border: 1px solid #337ab7;
	}
	@media (max-width: 680px) {
		.helpicon:hover .helptext {
			margin: 0 0 auto;
			position: fixed;
			top: 20%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
	.helptext {
		display: none;
		font-family: sans-serif;
		position: absolute;
		z-index: 1;
		text-shadow: none !important;
	}

	/* Classic UI Main Text */
	#gamescreen {
		overflow-x: hidden;
		display: flex;
		vertical-align: bottom;
		color: #ffffff;
		font-size: 12pt;
		font-family: "Helvetica";
	}
	#gamescreen span {
		align-self: flex-end;
	}
	#gametext {
		max-height: 100%;
		width: 100%;
		word-wrap: break-word;
		padding: 10px;
		overflow-y: auto;
		white-space: pre-wrap;
	}
	#gametext, chunk, chunk * {
		outline: 0px solid transparent;
	}
	#gametext img {
		max-width: 100%;
		height: auto;
	}
	.txtchunk{
		white-space: pre-wrap;
	}
	.lastreq
	{
		font-size:9pt;
		padding-top: 2px;
		text-shadow: 1px 1px 1px #000000;
	}

	/* Horizontal action bar */
	#actionmenuitems button,#actionmenuitems2 button {
		width: 78px;
	}
	#actionmenuitems button.slim,#actionmenuitems2 button.slim {
		width: 38px;
	}
	@media (max-width: 666px) {
		#actionmenuitems button,#actionmenuitems2 button {
			width: 60px;
			padding: 4px 4px;
			font-size: 12px;
		}
		#actionmenuitems button.slim,#actionmenuitems2 button.slim {
			width: 30px;
			padding: 4px 4px;
			font-size: 12px;
		}
	}
	.borderbox {
		border-radius: 5px;
		border: 1px solid #646464;
		padding: 4px;
		background: #373737;
	}

	/* Classic UI bottom rows */
	#inputrow {
		margin-top: 10px;
		padding: 0px;
		width: 100%;
		display: flex;
	}
	#inputrow > :nth-child(1) {
		flex: 0 0 0%; /* Effectively hides the first column */
	}
	#inputrow > :nth-child(2) {
		flex: 1; /* Flexible, takes up remaining space */
	}
	#inputrow > :nth-child(3) {
		flex: 0 0 64px; /* Fixed width for the third column */
	}
	#inputrow.show_mode > :nth-child(1) {
		flex: 0 0 50px; /* Fixed width for the first column */
	}
	#inputrow.show_mode > :nth-child(2) {
		flex: 1; /* Flexible, takes up remaining space */
	}
	#inputrow.show_mode > :nth-child(3) {
		flex: 0 0 64px; /* Fixed width for the third column */
	}
	.input_action
	{
		content:var(--img_sword);
	}
	.input_story
	{
		content:var(--img_paper);
	}
	.input_dice
	{
		content:var(--img_dice);
	}
	.input_chat
	{
		content:var(--img_chat);
	}
	#btnmode_chat, #btnmode_adventure {
		width: 100%;
		height: 100%;
		overflow: auto;
		overflow-x: hidden;
	}
	#btnsend {
		width: 100%;
		height: 100%;
		font-size: 11px;
		font-weight: bold;
		padding: 6px;
	}
	#btnsend.wait {
		background-color: #6c6c6e;
	}
	#btnsend.wait:hover {
		background-color: #98989a;
	}
	.showmicbig{
		width: 32px;
		height: 32px;
		margin:auto;
		background-repeat: no-repeat !important;
		background-position: center !important;
		background-image: var(--img_mic) !important;
	}
	.showmiclivebig{
		width: 32px;
		height: 32px;
		margin:auto;
		background-repeat: no-repeat !important;
		background-position: center !important;
		background-image: var(--img_mic_live) !important;
	}
	.showmicoffbig{
		width: 32px;
		height: 32px;
		margin:auto;
		background-repeat: no-repeat !important;
		background-position: center !important;
		background-image: var(--img_mic_off) !important;
	}
	.token-budget {
		right: 20px;
		bottom: 3px;
		color: gray;
		position: absolute;
		font-size: 8px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}


	/* Popup dialogs */
	.workerpopup {
		background-color: #263040;
		margin-top: 100px;
	}
	@media (max-width: 768px) {
		.workerpopup {
			width: 100%;
			background-color: #263040;
			margin-top: 100px;
		}
	}
	.nspopup {
		background-color: #263040;
		margin-top: 200px;
	}
	.nspopup.moderate {
		margin-top: 170px;
	}
	.nspopup.higher {
		margin-top: 120px;
	}
	.nspopup.evenhigher {
		margin-top: 70px;
	}
	.nspopup.highest {
		margin-top: 40px;
	}
	.nspopup.fixsize {
		width: 330px;
	}
	.nspopup.sidepanelsize {
		width: 330px!important;
		margin-top: 0px!important;
	}
	@media (max-width: 960px) {
		.nspopup.sidepanelsize {
			width: 33vw!important;
			margin-top: 0px!important;
		}
	}
	.nspopup.flexsize {
		width: 600px;
	}
	@media (max-width: 620px) {
		.nspopup.flexsize {
		width: 100%;
		}
	}
	.nspopup.flexsizesmall {
		width: 440px;
	}
	@media (max-width: 520px) {
		.nspopup.flexsizesmall {
		width: 100%;
		}
	}
	.nspopup.flexsizevsmall {
		width: 380px;
	}
	@media (max-width: 400px) {
		.nspopup.flexsizevsmall {
		width: 100%;
		}
	}
	.nspopup.flexsizebig {
		width: 940px;
	}
	@media (max-width: 992px) {
		.nspopup.flexsizebig {
		width: 740px;
		}
	}
	@media (max-width: 750px) {
		.nspopup.flexsizebig {
		width: 100%;
		}
	}
	.msgboxtxt
	{
		max-height: 320px;
		overflow-y: auto;
		overflow-wrap: break-word;
	}
	.popupcontainer{
		position: absolute;
		top: 0px;
		left: 0px;
		z-index: 3;
		width: 100%;
		height: 100%;
		flex-direction: column;
		align-items: center;
	}
	.popupcontainer.side{
		width: unset;
	}
	.popupcontainer.sideright{
		width: unset;
		left:unset;
		right:0px;
	}
	.popupbg {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -1;
		background-color: rgba(0, 0, 0, 0.5);
		flex-direction: column;
		align-items: center;
	}
	.popuptitlebar {
		padding: 10px;
		background-color: #757575;
	}
	body.connected .popuptitlebar {
		background-color: #337ab7;
	}
	.popuptitletext {
		display: flex;
		align-items: center;
		color: #ffffff;
		font-size: 12pt;
	}
	.popupfooter {
		width: 100%;
		padding: 10px;
		display: flex;
		justify-content: center;
		background-color: #4d4d4d;
	}
	body.connected .popupfooter{
		background-color: #295071;
	}
	.popupfooter button {
		width: 100px;
		margin-left: 10px;
		margin-right: 10px;
	}

	/* World info table */
	.widelbtn
	{
		font-size: 12px;
		height: 24px;
		padding: 5px;
		margin: 2px;
		font-weight: bolder;
	}
	.wiarrowbtn
	{
		font-size: 12px;
		height: 18px;
		padding: 2px;
		margin: 0px 1px 0px 1px;
		font-weight: bolder;
	}
	.wiinputkeycol
	{
		min-width: 70px;
		width: 15%;
	}
	.wiinputkey
	{
		font-size: 14px;
		height: 24px;
		padding: 2px;
		margin: 0px;
	}
	.wiinputvalcol
	{
		width: 85%;
	}
	.wiinputval
	{
		font-size: 14px;
		height: 24px;
		padding: 2px;
		margin: 0px;
		resize: vertical;
	}
	.wilist
	{
		background-color: #434343;
		overflow-y: auto;
		max-height: 320px;
		min-height: 60px;
	}
	.witoggleroff,.witoggleroff:hover,.witoggleroff:focus
	{
		color: transparent;
		text-shadow: 0 0 0 gray;
		text-decoration:none;
	}
	.witoggleron,.witoggleron:hover,.witoggleron:focus
	{
		color: transparent;
		text-shadow: 0 0 0 #0cdb0c;
		text-decoration:none;
	}

	/* Worker table */
	.workerTableDiv,.shareStory{
		max-height: 420px;
		overflow-y: auto;
		overflow-x: hidden;
	}
	.workerTable{
		color: #ffffff;
		font-size: min(1.4vw,14px);
	}
	.workerTable>tbody>tr>td{
		padding: min(0.4vw, 5px);
	}

	/* Logprobs table */
	.logprobstable
	{
		font-size: 11px;
		width: 100%;
		border-spacing: 2px;
	}
	.logprobstable table, th, td {
		border: 2px solid #5d5d5d;
	}
	.logprobstable>tbody>tr>td
	{
		width: 16.4%;
	}
	.tablelines
	{
		border: 1px solid;
	}

	/* Scenario menu */
	.scenariopopup {
		width: 600px;
		background-color: #263040;
		margin-top: 60px;
	}

	@media (max-width: 768px) {
		.scenariopopup {
			width: 100%;
			background-color: #263040;
			margin-top: 70px;
		}
	}
	.scenariosearch
	{
		margin-top: 8px;
		margin-left: 8px;
		width: calc(100% - 16px);
		padding: 4px;
	}
	.scenariosearchbox1
	{
		display: inline;
		width: calc(100% - 100px);
	}
	.scenariosearchbox2
	{
		display: inline;
		width: 94px;
		padding: 6px 3px;
	}
	.scenariogrid
	{
		height: 260px;
		overflow-y: auto;
		margin-top: 4px;
		padding: 8px;
		display: grid;
		gap: 8px;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		grid-auto-rows: 55px;
	}
	.scenariodesc
	{
		padding: 4px 12px;
		width: 100%;
		height: 160px;
		color: #b7e2ff;
		overflow-y: auto;
	}
	.scenarioitem
	{
		font-size: 14px;
		color: white;
		font-weight: 500;
		font-family: 'Segoe UI', Tahoma;
		background-repeat: no-repeat;
		background-position: top 4px left 4px, center;
		background-size: 24px, 100%;
		padding: 2px 2px;
	}
	.scenarioitem.blue
	{
		background-image: var(--img_paper),linear-gradient(to right, #63aae7, #337ab7);
	}
	.scenarioitem.blue:hover
	{
		background-image: var(--img_paper),linear-gradient(to right, #7ebbf0, #438ac7);
	}
	.scenarioitem.blue:focus
	{
		background-image: var(--img_paper),linear-gradient(to right, #4c7aa3, #4c7aa3);
	}
	.scenarioitem.green
	{
		background-image: var(--img_sword),linear-gradient(to right, #58db6e, #2ba04e);
	}
	.scenarioitem.green:hover
	{
		background-image: var(--img_sword),linear-gradient(to right, #68e47d, #37b85e);
	}
	.scenarioitem.green:focus
	{
		background-image: var(--img_sword),linear-gradient(to right, #53a34c, #4ca353);
	}
	.scenarioitem.red
	{
		background-image: var(--img_chat),linear-gradient(to right, #e76363, #b73333);
	}
	.scenarioitem.red:hover
	{
		background-image: var(--img_chat),linear-gradient(to right, #f07e7e, #c74343);
	}
	.scenarioitem.red:focus
	{
		background-image: var(--img_chat),linear-gradient(to right, #a34c4c, #a34c4c);
	}
	.scenarioitem.purple
	{
		background-image: none,linear-gradient(to right, #dc63e7, #ac33b7);
	}
	.scenarioitem.purple:hover
	{
		background-image: none,linear-gradient(to right, #f07ee6, #c743c7);
	}
	.scenarioitem.purple:focus
	{
		background-image: none,linear-gradient(to right, #a34c9c, #a34ca3);
	}
	.scenarioitem.yellow
	{
		background-image: var(--img_compass),linear-gradient(to right, #daae5d, #ad8823);
	}
	.scenarioitem.yellow:hover
	{
		background-image: var(--img_compass),linear-gradient(to right, #e0c56e, #bba632);
	}
	.scenarioitem.yellow:focus
	{
		background-image: var(--img_compass),linear-gradient(to right, #a38c4c, #a38c4c);
	}

	/* Welcome splash */
	.welcome-theme-selector {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 16px;
	}
	.welcome-theme-option {
		border: 2px solid #666666;
		padding: 8px;
		border-radius: 6px;
		cursor: pointer;
	}
	.welcome-theme-option:hover {
		border-color: #eeeeee;
	}
	.welcome-theme-image {
		display: block;
		width: min(23vw, 150px);
		height: min(23vw, 150px);
		margin-bottom: 8px;
	}
	.welcomeimg1
	{
		content:var(--img_theme_1);
	}
	.welcomeimg2
	{
		content:var(--img_theme_2);
	}
	.welcomeimg3
	{
		content:var(--img_theme_3);
	}

	/* Spinning load circle for requests */
	.outerloader {
		display: flex;
		margin: auto;
		align-items: center;
		justify-content: center;
	}
	.outerloadernum
	{
		position: absolute;
		color:white;
		font-size: 11px;
	}
	.innerloader {
		width: 32px;
		height: 32px;
		border: 5px solid #f3f3f3;
		border-top: 5px solid #3498db;
		border-radius: 50%;
		animation: spin 4s linear infinite;
	}
	.innerloader.greenloader
	{
		border-top: 5px solid #0dcc2d;
	}
	.innerloader.redloader
	{
		border-top: 5px solid #f7610a;
	}

	/* Spinning load circle for images and inline images */
	.imgloader
	{
		border: 5px solid #8a8686;
		border-top: 5px solid peru;
		border-radius: 50%;
		width: 32px;
		height: 32px;
		display: flex;
		margin: auto;
		align-items: center;
		justify-content: center;
		animation: spin 4s linear infinite;

		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		position: absolute;
		margin: auto;
	}
	.imagelabel
	{
		bottom: 20%;
		left: 0;
		right: 0;
		position: absolute;
		margin: auto;
		text-align: center;
		color:peru;
		font-weight: bold;
	}
	.storyimgfloat
	{
		width: fit-content;
		float: right;
		position: relative;
		padding: 4px;
		clear: both;
	}
	.storyimgsidevertical
	{
		width: fit-content;
		text-align: center;
		position: relative;
		padding: 4px;
		margin: 0;
	}
	.storyimgsidehorizontal
	{
		display: table-cell;
		width: fit-content;
		text-align: center;
		position: relative;
		padding: 4px;
		margin: 0 auto;
	}
	.storyimgcenter
	{
		width: fit-content;
		text-align: center;
		position: relative;
		padding: 4px;
		margin: 0 auto;
	}

	/* Clicked in image preview window */
	.zoomedimgdiv
	{
		text-align: center;
		position: relative;
		margin: 0 auto;
		padding-top: 6px;
		padding-bottom: 4px;
	}
	.zoomedimgdesc{
		max-height: 120px;
		overflow-y: auto;
		overflow-x: hidden;
		font-size: 12px;
	}
	.zoomedimg
	{
		border-radius: 6%;
		width:462px;
		height:462px;
	}
	.zoomedimg.portrait
	{
		width:308px;
		height:462px;
	}
	.zoomedimg.portrait_long
	{
		width:231px;
		height:462px;
	}
	.zoomedimg.landscape
	{
		width:462px;
		height:308px;
	}
	.zoomedimg.landscape_long
	{
		width:462px;
		height:231px;
	}
	@media (max-width: 620px) {
		.zoomedimg {
			width:min(96vw, 420px);
			height:min(96vw, 420px);
		}
		.zoomedimg.portrait
		{
			width:min(64vw, 280px);
			height:min(96vw, 420px);
		}
		.zoomedimg.landscape
		{
			width:min(96vw, 420px);
			height:min(64vw, 280px);
		}
		.zoomedimg.portrait_long
		{
			width:min(48vw, 210px);
			height:min(96vw, 420px);
		}
		.zoomedimg.landscape_long
		{
			width:min(96vw, 420px);
			height:min(48vw, 210px);
		}
	}

	/* Spinning circle animation */
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		12.4% {
			transform: rotate(0deg);
		}
		12.5% {
			transform: rotate(45deg);
		}
		24.9% {
			transform: rotate(45deg);
		}
		25% {
			transform: rotate(90deg);
		}
		37.4% {
			transform: rotate(90deg);
		}
		37.5% {
			transform: rotate(135deg);
		}
		49.9% {
			transform: rotate(135deg);
		}
		50% {
			transform: rotate(180deg);
		}
		62.4% {
			transform: rotate(180deg);
		}
		62.5% {
			transform: rotate(225deg);
		}
		74.9% {
			transform: rotate(225deg);
		}
		75% {
			transform: rotate(270deg);
		}
		87.4% {
			transform: rotate(270deg);
		}
		87.5% {
			transform: rotate(315deg);
		}
		99.9% {
			transform: rotate(315deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	/* no custom scrollbars on mobile */
	@media screen and (hover: hover) and (any-pointer: fine)
	{
		::-webkit-scrollbar {
		width: 8px;
		}
		::-webkit-scrollbar-track {
		background: transparent;
		}
		::-webkit-scrollbar-thumb {
		background-color: #9191915e;
		border-radius: 10px;
		border: transparent;
		}
		::-webkit-scrollbar-thumb:hover {
		background: #9494948a;
		}
	}

	/* Background images */
	.gamescreenbgnormal
	{
		background-color: #262626;
	}
	.translucentbg
	{
		background-color: #00000066;
	}
	.transparentbg
	{
		background-color: #00000000 !important;
	}

	/* Messenger UI */
	.chat_received_msg {
		display: inline-block;
		padding: 0 0 0 10px;
		vertical-align: top;
		width: 92%;
	}

	.chat_received_withd_msg p {
		font-size: 14px;
		margin: 0;
		padding: 5px 10px 5px 12px;
		width: 100%;
		white-space: pre-wrap;
	}

	.chat_received_withd_msg {
		width: 75%;
		background: #1d282f none repeat scroll 0 0;
		border-radius: 0 15px 15px 15px;
		color: #dde6e7;
		overflow:auto;
	}
	.chat_mesgs{
		width:100%;
		background: #0b141a;
	}
	.chat_mesgs_inner{
		padding: 12px 20px 12px 20px;
	}
	.chat_sent_msg p {
		font-size: 14px;
		margin: 0;
		color: #dde6e7;
		padding: 5px 10px 5px 12px;
		width: 100%;
		white-space: pre-wrap;
	}
	.chat_sent_msg {
		float: right;
		width: 75%;
		overflow:auto;
		background:#005c4b;
		border-radius: 12px 15px 0px 15px;
	}
	.chat_outgoing_msg {
		overflow: hidden;
		margin: 8px 0 8px;
	}
	.incoming_msg
	{
		margin: 8px 0 8px;
	}
	.cht_inp_bg
	{
		display: inline-block;
		width: calc(100% - 84px);
		background: #222222aa none repeat scroll 0 0;
		margin-top: 8px;
		margin-left: 2px;
		border-radius: 16px;
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 7px;
        border: 1px solid #bbbbbbaa;
	}
	.cht_inp_bg_inner
	{
		width: 100%;
		resize: none;
		overflow-x:hidden;
		background: #00000000 none repeat scroll 0 0;
		border: medium none;
		color: #bebebe;
		font-size: 15px;
		outline:none;
	}
	.cht_inp_bg.shorter
	{
		width: calc(100% - 114px);
	}
	.cht_inp_hold_outer {
		border-top: 1px solid #c4c4c4;
		position: relative;
	}
	.chat_btnmode_chat {
		background: #143574 none repeat scroll 0 0;
		border:none;
		border-radius: 50%;
		color: #fff;
		cursor: pointer;
		font-size: 15px;
		height: 33px;
		position: relative;
		vertical-align: top;
		top: 11px;
		width: 33px;
		background-size: 50% !important;
		background-repeat: no-repeat !important;
 		background-position: center !important;
		background-image: var(--img_chat) !important;
	}
	.chat_btnmode_adventure{
		background: #3263be none repeat scroll 0 0;
		border:none;
		border-radius: 50%;
		color: #fff;
		cursor: pointer;
		font-size: 15px;
		height: 33px;
		position: relative;
		vertical-align: top;
		top: 11px;
		width: 33px;
		background-size: 50% !important;
		background-repeat: no-repeat !important;
 		background-position: center !important;
	}
	.chat_btnmode_adventure.storymode
	{
		background-image: var(--img_paper) !important;
	}
	.chat_btnmode_adventure.actionmode
	{
		background-image: var(--img_sword) !important;
	}
	.chat_btnmode_adventure.dicemode
	{
		background-image: var(--img_dice) !important;
	}
	.chat_msg_send_btn {
		background: #337ab7 none repeat scroll 0 0;
		border:none;
		border-radius: 50%;
		color: #fff;
		cursor: pointer;
		font-size: 15px;
		height: 33px;
		position: absolute;
		right: 40px;
		top: 11px;
		width: 33px;
		background-size: 50% !important;
		background-repeat: no-repeat !important;
 		background-position: center !important;
		background-image: var(--img_chat_send_btn) !important;
	}
	.chat_msg_send_btn:hover {
		background: #3f94df none repeat scroll 0 0;
	}
	.chat_msg_send_btn:disabled {
		background: #838383 none repeat scroll 0 0;
	}
	.chat_msg_send_btn.showmic{
		background-image: var(--img_mic) !important;
	}
	.chat_msg_send_btn.showmiclive{
		background-image: var(--img_mic_live) !important;
	}
	.chat_msg_send_btn.showmicoff{
		background-image: var(--img_mic_off) !important;
	}
	.chat_msg_send_btn_abort {
		background: #b73333 none repeat scroll 0 0;
		border:none;
		border-radius: 50%;
		color: #fff;
		cursor: pointer;
		font-size: 15px;
		height: 33px;
		position: absolute;
		right: 40px;
		top: 11px;
		width: 33px;
		background-size: 50% !important;
		background-repeat: no-repeat !important;
 		background-position: center !important;
		background-image: var(--img_chat_abort_btn) !important;
	}
	.chat_msg_send_btn_abort:hover {
		background: #df3f3f none repeat scroll 0 0;
	}
	.chat_msg_send_btn_abort:disabled {
		background: #838383 none repeat scroll 0 0;
	}
	.chat_msg_cust_btn {
		background: #169c7b none repeat scroll 0 0;
		border:none;
		border-radius: 50%;
		color: #fff;
		cursor: pointer;
		font-size: 15px;
		height: 33px;
		position: absolute;
		right: 0;
		top: 11px;
		width: 33px;
		background-size: 64% !important;
		background-repeat: no-repeat !important;
  		background-position: center !important;
		background-image: var(--img_chat_cust_btn) !important ;

	}
	.chat_msg_cust_btn:hover {
		background: #18b991 none repeat scroll 0 0;
	}
	.chat_msg_cust_btn:disabled {
		background: #838383 none repeat scroll 0 0;
	}
	.chat_msg_history {
		overflow-y: auto;
	}
	.chat_msg_history img {
		max-width: 100%;
		height: auto;
	}

	/* Chat typing effect with flashing dots */
	.dot-flashing {
		position: relative;
		left: -15px;
		width: 8px;
		height: 8px;
		border-radius: 5px;
		background-color: #9e9e9e;
		color: #9e9e9e;
		animation: dot-flashing 1s infinite linear alternate;
		animation-delay: 0.5s;
	}
	.dot-flashing::before, .dot-flashing::after {
		content: "";
		display: inline-block;
		position: absolute;
		top: 0;
	}
	.dot-flashing::before {
		left: -15px;
		width: 8px;
		height: 8px;
		border-radius: 5px;
		background-color: #9e9e9e;
		color: #9e9e9e;
		animation: dot-flashing 1s infinite alternate;
		animation-delay: 0s;
	}
	.dot-flashing::after {
		left: 15px;
		width: 8px;
		height: 8px;
		border-radius: 5px;
		background-color: #9e9e9e;
		color: #9e9e9e;
		animation: dot-flashing 1s infinite alternate;
		animation-delay: 1s;
	}
	@keyframes dot-flashing {
		0% {
			background-color: #9e9e9e;
		}
		29.9% {
			background-color: #9e9e9e;
		}
		30%, 100% {
			background-color: #9e9e9e33;
		}
	}

	/* Aesthetic UI */
	.ui-settings-inline { font-size: 12px; display:flex; flex-direction: row; }
	.instruct-settings-input { margin: 0px 2px; font-size:10px; }
	.instruct-settings-input input { width:40px; height:20px; }
	#code-block-background-colorselector, #code-block-foreground-colorselector { text-align: center; margin: 0px 5px; }
	#you-text-colorselector, #you-speech-colorselector, #you-action-colorselector, #AI-text-colorselector, #AI-speech-colorselector, #AI-action-colorselector, #sys-text-colorselector, #sys-speech-colorselector, #sys-action-colorselector { text-align: center; margin: 0px 5px; }
	#you-bubble-colorselector, #AI-bubble-colorselector, #sys-bubble-colorselector, #you-portrait, #AI-portrait { text-align: center; margin: 0px 10px; border-radius: 1rem; padding: 1px 6px; }
	@media screen and (max-width: 880px) {
		#aesthetic_text_preview_panel { display: none; }
	}
	.aui_nametag
	{
		margin: 0 0 3px;
		font-weight: bold;
	}

	/* Corpo UI */
	.corpostyle
	{
		background-color: #ffffff;
		overflow-x: hidden;
		max-height: 100%;
		width: 100%;
		word-wrap: break-word;
		font-size: 18px;
		font-family: Inter, sans-serif;
		tab-size: 4;
		line-height: 32px;
		color: rgb(55, 65, 81);
		display: flex;
	}
	@media (max-width: 400px)
	{
		.corpostyle
		{
			font-size: 16px;
			line-height: 26px;
		}
		.corpostyleinner
		{
			padding-left: 6px;
			padding-right: 6px;
			margin-top: 0px;
		}
		.corpostyleitem
		{
			padding-left: 6px;
			padding-right: 6px;
			padding-top: 8px;
			padding-bottom: 8px;
		}
	}
	body.darkmode .corpostyle {
		background-color: #222222;
		color: #ececec;
	}
	.corpo_edit_outer
	{
		display: inline-block;
		background: #f4f4f4aa none repeat scroll 0 0;
		margin-top: 6px;
		margin-bottom: 6px;
		border-radius: 16px;
		padding-left: 12px;
		padding-right: 12px;
		padding-top: 8px;
		width:100%;
        border: 1px solid #bbbbbbaa;
		position: relative;
	}
	.corpo_edit_inner
	{
		width: 100%;
		resize: none;
		overflow-x:hidden;
		background: #00000000 none repeat scroll 0 0;
		border: medium none;
		color: #0d0d0d;
		font-size: 20px;
		font-weight: 400;
		outline:none;
		line-height: 28px;
	}
	.corpo_chat_outer
	{
		width: calc(100% - 24px);
		max-width: 860px;
		background: #f4f4f4aa none repeat scroll 0 0;
		margin-top: 6px;
		margin-bottom: 4px;
		margin-left: auto;
		margin-right: auto;
		border-radius: 16px;
		padding-left: 52px;
		padding-right: 52px;
		padding-top: 8px;
        border: 1px solid #bbbbbbaa;
		position: relative;
	}
	body.darkmode .corpo_chat_outer
	{
		background: #3b3b3baa none repeat scroll 0 0;
	}
	.corpo_chat_inner
	{
		width: 100%;
		resize: none;
		overflow-x:hidden;
		background: #00000000 none repeat scroll 0 0;
		border: medium none;
		color: #0d0d0d;
		font-size: 20px;
		font-weight: 400;
		outline:none;
		line-height: 28px;
	}
	body.darkmode .corpo_chat_inner
	{
		color: #dddddd;
	}
	.corpo_chat_img_btn
	{
		background: #000000 none repeat scroll 0 0;
		border:none;
		border-radius: 50%;
		color: #fff;
		cursor: pointer;
		font-size: 15px;
		height: 33px;
		position: absolute;
		left: 12px;
		bottom: 10px;
		width: 33px;
		background-size: 50% !important;
		background-repeat: no-repeat !important;
 		background-position: center !important;
		background-image: var(--img_corpo_clip) !important;
	}
	.corpo_chat_img_btn:hover {
		background: #555555 none repeat scroll 0 0;
	}
	.corpo_chat_img_btn:disabled {
		background: #838383 none repeat scroll 0 0;
	}
	.corpo_chat_send_btn {
		background: #000000 none repeat scroll 0 0;
		border:none;
		border-radius: 50%;
		color: #fff;
		cursor: pointer;
		font-size: 15px;
		height: 33px;
		position: absolute;
		right: 12px;
		bottom: 10px;
		width: 33px;
		background-size: 50% !important;
		background-repeat: no-repeat !important;
 		background-position: center !important;
		background-image: var(--img_corpo_send_btn) !important;
	}
	.corpo_chat_send_btn:hover {
		background: #555555 none repeat scroll 0 0;
	}
	.corpo_chat_send_btn:disabled {
		background: #838383 none repeat scroll 0 0;
	}
	.corpo_chat_send_btn_abort {
		background: #000000 none repeat scroll 0 0;
		border:none;
		border-radius: 50%;
		color: #fff;
		cursor: pointer;
		font-size: 15px;
		height: 33px;
		position: absolute;
		right: 12px;
		bottom: 12px;
		width: 33px;
		background-size: 50% !important;
		background-repeat: no-repeat !important;
 		background-position: center !important;
		background-image: var(--img_corpo_abort_btn) !important;
	}
	.corpo_btn_text
	{
		display: inline-block;
		padding-top: 8px;
		vertical-align: top;
		color:#666666;
		font-size: 17px;
	}
	.corpo_hover_btn {
		background: #ffffff00 none repeat scroll 0 0;
		border:none;
		border-radius: 20%;
		cursor: pointer;
		height: 32px;
		width: 32px;
		background-size: 60% !important;
		background-repeat: no-repeat !important;
 		background-position: center !important;
	}
	.corpo_hover_btn:hover {
		background: #eeeeee none repeat scroll 0 0;
	}
	body.darkmode .corpo_hover_btn:hover {
		background: #454545 none repeat scroll 0 0;
	}
	.corpoleftpanel
	{
		width:256px;
		background-color: #e2e5e6;
		padding-left: 8px;
		padding-right: 8px;
		transition: transform 0.3s ease;
		height: calc(100vh - 68px);
		z-index: 1;
	}
	body.darkmode .corpoleftpanel
	{
		background-color: #161616;
	}
	.corpoendeditbutton {
      position: fixed;
      top: 75px;
      right: 25px;
	  width: 40px;
      padding: 8px 6px;
      background-color: #de5b5b;
      color: white;
      border-radius: 24px;
	  opacity: 0.65;
      cursor: pointer;
      box-shadow: 1 2px 8px rgba(0, 0, 0, 0.2);
    }

    .corpoendeditbutton:hover {
      background-color: #f67676;
    }
	.corpoleftpanelitems
	{
		display: flex;
		flex-direction: column;
		margin-top: 16px;
		padding: 2px;
		height: calc(100% - 20px);
	}
	.corpoleftpanelitemsinner
	{
		display: flex;
		flex-direction: column;
		padding: 2px;
		overflow-y: auto;
		overflow-x: hidden;
		text-overflow: ellipsis;
		display: inline-block;
		margin: 2px;
		margin-top: 4px;
		margin-bottom: 4px;
	}
	.corpoleftpanelitemstopper
	{
		display: flex;
		flex-direction: column;
		padding: 2px;
		display: inline-block;
	}
	.corpo_leftpanel_btn
	{
		padding: 4px;
		margin: 2px;
		background: #f4f4f400;
		border:none;
		border-radius: 8px;
		cursor: pointer;
		font-size: 17px;
		background-repeat: no-repeat;
    	background-position: 8px;
		background-size: 24px;
		overflow: hidden;
    	text-overflow: ellipsis;
		white-space: nowrap;
		user-select: none;
		width: 100%;
	}
	.corpo_leftpanel_btn:hover {
		background: #9dcef5;
		background-repeat: no-repeat;
    	background-position: 8px;
		background-size: 24px;
	}
	.corpo_leftpanel_btn.red:hover {
		color: #000000;
		background: #f5767f;
		background-repeat: no-repeat;
    	background-position: 8px;
		background-size: 24px;
	}
	.corpo_leftpanel_btn:active {
		transform: translateY(1px);
	}
	body.darkmode .corpo_leftpanel_btn:hover
	{
		color: #76a8ee;
		background: #454545;
		background-repeat: no-repeat;
    	background-position: 8px;
		background-size: 24px;
	}
	body.darkmode .corpo_leftpanel_btn.red:hover
	{
		color: #000000;
		background: #f5767f;
		background-repeat: no-repeat;
    	background-position: 8px;
		background-size: 24px;
	}
	.corporightpanel
	{
		width: 100%;
		height: calc(100vh - 68px);
		display: flex;
    	flex-direction: column;
		padding-left: 2px;
		padding-right: 2px;
	}
	.corpo_leftpanel_close
	{
		display: none;
		border: none;
		font-size: 28px;
		padding: 8px;
		padding-left: 0px;
		float: right;
		background-color: #00000000;
	}
	.corpo_leftpanel_open
	{
		display: none;
		background: #f0f0f0;
		border:none;
	}
	.corpo_leftpanel_open:hover
	{
		background: #dddddd;
	}
	body.darkmode .corpo_leftpanel_open
	{
		background: #333333;
	}
	body.darkmode .corpo_leftpanel_open:hover
	{
		background: #444444;
	}
	.corpo_arrow_right {
		display: inline-block;
		width: 0;
		height: 0;
		border-top: 16px solid transparent;
		border-bottom: 16px solid transparent;
		border-left: 10px solid #aaaaaa;
	}
	@media (max-width: 768px)
	{
		.corpostylemain
		{
			margin-top: 0px;
		}
		.corpoleftpanel {
			position: fixed;
			left: 0;
			top: 0;
			height: 100%;
			transform: translateX(-100%);
		}
		.corpoleftpanel.open {
			transform: translateX(0);
		}
		.corpo_leftpanel_close {
			display: block;
		}
		.corpo_leftpanel_open {
			display: block;
		}
	}
	.corpowelcome
	{
		font-size: 26px;
		font-weight: 550;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 75vh;
		flex-direction: column;
		text-align: center;
	}
	.corpomainbtm
	{
		padding-left: 2px;
		padding-right: 2px;
		margin-top: auto;
	}
	.corpostylemain
	{
		overflow-y: auto;
		padding-left: 2px;
		padding-right: 2px;
		margin-top: 12px;
	}
	.corpostyleinner
	{
		max-width: 860px;
		margin-left: auto;
    	margin-right: auto;
		padding-left: 8px;
		padding-right: 8px;
	}
	.corpostyleitem
	{
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 10px;
		padding-bottom: 10px;
		display: flex;
	}
	.corpoavatar
	{
		height:34px;
		width:auto;
		padding:4px;
		margin-right:6px;
		border-radius:50%;
		cursor:pointer;
	}
	.corpostyleitemheading
	{
		color: rgb(33, 33, 33);
		font-weight: 600;
	}
	body.darkmode .corpostyleitemheading
	{
		color: rgb(230,230,230);
	}
	.corpostyleitemcontent
	{
		white-space: pre-wrap;
	}
	.corpostyleitemcontent img {
		max-width: 100%;
		height: auto;
	}
	.corpolastreq
	{
		text-align:center;
		font-size:14px;
		line-height:1.1;
		margin:4px;
		margin-bottom:6px;
		margin-left:12px;
	}

	/* Colors */
	.hlchunk
	{
		color:#cedaf0;
	}
	.color_blueurl {
		color: #d3e7ff;
	}
	.color_blueurl:hover {
		color: #ffffff;
	}
	.color_blueurl:focus {
		color: #d3e7ff;
	}
	.color_orangeurl {
		color: #f7a223;
	}
	.color_orangeurl:hover {
		color: #ffe8d6;
	}
	.color_orangeurl:focus {
		color: #ffedd3;
	}
	.color_grayurl {
		color: #9e9e9e;
	}
	.color_grayurl:hover {
		color: #9f9f9f;
	}
	.color_grayurl:focus {
		color: #9e9e9e;
	}

	.color_orange {
		color: #f7a223;
	}
	.color_green {
		color: #3bf723;
	}
	.color_lightgreen {
		color: #6db95e;
	}
	.color_offwhite {
		color: #bedae9;
	}
	.color_darkgreen {
		color: #63975c;
	}
	.color_cyan {
		color: #7afaff;
	}
	.color_gray {
		color: #9b9b9b;
	}
	.color_lightgray {
		color: #bbbbbb;
	}
	.color_red {
		color: #ff7967;
	}
	.color_chat1 {
		color: #da6060;
	}
	.color_chat2 {
		color: #e0c158;
	}
	.color_chat3 {
		color: #53c753;
	}
	.color_chat4 {
		color: #b469ae;
	}
	.color_blue {
		color: #828eff;
	}
	.color_yellow {
		color: #f1dd21;
	}
	.color_pink {
		color: #ffbdbd;
	}

	.bg_black {
		background-color: #202020;
	}
	.bg_black:hover {
		background-color: #202020;
	}
	.bg_black:focus {
		background-color: #202020;
	}
	.bg_black:disabled {
		background-color: #202020;
	}
	.bg_black:disabled:hover {
		background-color: #202020;
	}
	.bg_green {
		background-color: #129c00;
	}
	.bg_green:hover {
		background-color: #058105;
	}
	.bg_green:active:focus {
		background-color: #105e10;
	}
	.bg_green:focus {
		background-color: #058105;
	}
	.bg_green:disabled {
		background-color: #8a8a8a;
	}
	.bg_green:disabled:hover {
		background-color: #8a8a8a;
	}
	.bg_red {
		background-color: #c40000;
	}
	.bg_red:hover {
		background-color: #da0000;
	}
	.bg_red:active:focus {
		background-color: #970606;
	}
	.bg_red:focus {
		background-color: #da0000;
	}
	.bg_red:disabled {
		background-color: #8a8a8a;
	}
	.bg_red:disabled:hover {
		background-color: #8a8a8a;
	}
	.bg_orange {
		background-color: #cc7e09;
	}
	.bg_orange:hover {
		background-color: #db8e1a;
	}
	.bg_orange:active:focus {
		background-color: #ac8314;
	}
	.bg_orange:focus {
		background-color: #b37b15;
	}
	.bg_orange:disabled {
		background-color: #8a8a8a;
	}
	.bg_orange:disabled:hover {
		background-color: #8a8a8a;
	}
	.bg_purple {
		background-color: #b900b0;
	}
	.bg_purple:hover {
		background-color: #99009e;
	}
	.bg_purple:active:focus {
		background-color: #7a137a;
	}
	.bg_purple:focus {
		background-color: #81057b;
	}
	.bg_purple:disabled {
		background-color: #8a8a8a;
	}
	.bg_purple:disabled:hover {
		background-color: #8a8a8a;
	}
	.bg_teal {
		background-color: #008f9c;
	}
	.bg_teal:hover {
		background-color: #058181;
	}
	.bg_teal:active:focus {
		background-color: #105e5e;
	}
	.bg_teal:focus {
		background-color: #057b81;
	}
	.bg_teal:disabled {
		background-color: #8a8a8a;
	}
	.bg_teal:disabled:hover {
		background-color: #8a8a8a;
	}
	.bg_primary {
		background-color: #337ab7;
	}
	.bg_primary:hover {
		background-color: #286090;
	}
	.bg_primary:active:focus {
		background-color: #23527c;
	}
	.bg_primary:focus {
		background-color: #23527c;
	}
	.bg_primary:disabled {
		background-color: #8a8a8a;
	}
	.bg_primary:disabled:hover {
		background-color: #8a8a8a;
	}

	.bluebtn {
		color: #fff;
		background-color: #5bc0de;
		border-color: #46b8da
	}
	.bluebtn.focus,.bluebtn:focus {
		color: #fff;
		background-color: #31b0d5;
		border-color: #1b6d85
	}
	.bluebtn:hover {
		color: #fff;
		background-color: #31b0d5;
		border-color: #269abc
	}
	.bluebtn.active,.bluebtn:active{
		color: #fff;
		background-color: #31b0d5;
		background-image: none;
		border-color: #269abc
	}
	.purplebtn {
		color: #fff;
		background-color: #9a5bde;
		border-color: #c946da
	}
	.purplebtn.focus,.purplebtn:focus {
		color: #fff;
		background-color: #9a5bde;
		border-color: #6c1b85
	}
	.purplebtn:hover {
		color: #fff;
		background-color: #9a5bde;
		border-color: #c946da
	}
	.purplebtn.active,.purplebtn:active{
		color: #fff;
		background-color: #9a5bde;
		background-image: none;
		border-color: #c946da
	}
	.lightpurplebtn {
		color: #fff;
		background-color: #b888eb;
		border-color: #dd60ee
	}
	.lightpurplebtn.focus,.lightpurplebtn:focus {
		color: #fff;
		background-color: #b888eb;
		border-color: #9035ac
	}
	.lightpurplebtn:hover {
		color: #fff;
		background-color: #b888eb;
		border-color: #dd60ee
	}
	.lightpurplebtn.active,.lightpurplebtn:active{
		color: #fff;
		background-color: #b888eb;
		background-image: none;
		border-color: #dd60ee
	}
	.redbtn {
		color: #fff;
		background-color: #d9534f;
		border-color: #d43f3a
	}
	.redbtn.focus,.redbtn:focus {
		color: #fff;
		background-color: #c9302c;
		border-color: #761c19
	}
	.redbtn:hover {
		color: #fff;
		background-color: #c9302c;
		border-color: #ac2925
	}
	.redbtn.active,.redbtn:active {
		color: #fff;
		background-color: #c9302c;
		background-image: none;
		border-color: #ac2925
	}
    `;

    const BLTOOLspecificstyles = `
        .BLTOOL-body {
        margin: 0;
        padding: 20px;
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        }
        .BLTOOL-sample-content {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .BLTOOL-h1 {
        color: #333;
        }
        .BLTOOL-button {
        padding: 6px 12px;
        font-size: 14px;
        border: none;
        border-radius: 4px;
        color: white;
        cursor: pointer;
        margin: 2px 0;
        transition: background-color 0.3s ease;
        white-space: nowrap;
        }
        .BLTOOL-button-primary {
        background-color: #129c00;
        }
        .BLTOOL-button-secondary {
        background-color: #337ab7;
        }
        .BLTOOL-button-danger {
        background-color: #d9534f;
        }
        .BLTOOL-button-toggle {
        background-color: #337ab7;
        }
        .BLTOOL-button:hover {
        opacity: 0.9;
        }
        @media (max-width: 768px) {
        .BLTOOL-button {
        width: 100%;
        }
        }
        .BLTOOL-blacklite-tools {
        all: initial !important;
        position: fixed !important;
        top: 50px !important;
        right: 20px !important;
        width: 350px !important;
        max-height: 90vh !important;
        background-color: #1e1e1e !important;
        color: white !important;
        border-radius: 8px !important;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1) !important;
        z-index: 99999 !important;
        padding: 10px !important;
        font-family: sans-serif !important;
        overflow: hidden !important;
        display: flex !important;
        flex-direction: column !important;
        }
        .BLTOOL-tab-button {
        flex: 1;
        text-align: center;
        padding: 5px;
        cursor: pointer;
        background-color: #2e2e2e;
        border: none;
        }
        .BLTOOL-tab-button.BLTOOL-active-tab {
        background-color: #337ab7;
        }
        .BLTOOL-scroll-container {
        max-height: 500px;
        overflow-y: auto;
        width: 100%;
        box-sizing: border-box;
        }
        @media (max-width: 768px) {
        .BLTOOL-blacklite-tools {
        width: 90%;
        left: 5%;
        right: auto;
        top: 10px;
        max-height: 95vh;
        }
        .BLTOOL-tab-button {
        flex: 1 1 33%;
        font-size: 12px;
        padding: 3px;
        }
        }
    `;

    const CONFIG = {
        MOBILE_BREAKPOINT: 768,
        PRESERVED_STYLES: ['align-items', 'animation', 'animation-delay', 'appearance', 'background-attachment', 
                          'background-color', 'background-image', 'background-position', 'background-repeat', 
                          'background-size', 'border', 'border-bottom', 'border-color', 'border-left', 
                          'border-radius', 'border-right', 'border-top', 'border-width', 'bottom', 'box-shadow', 
                          'box-sizing', 'clear', 'color', 'content', 'cursor', 'display', 'filter', 'flex', 
                          'flex-direction', 'flex-flow', 'flex-wrap', 'float', 'font-family', 'font-size', 
                          'font-weight', 'gap', 'grid-auto-rows', 'grid-template-columns', 'height', 
                          'justify-content', 'left', 'line-height', 'margin', 'margin-bottom', 'margin-left', 
                          'margin-right', 'margin-top', 'max-height', 'max-width', 'min-height', 'min-width', 
                          'opacity', 'outline', 'overflow', 'overflow-wrap', 'overflow-x', 'overflow-y', 
                          'padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 
                          'position', 'resize', 'right', 'tab-size', 'text-align', 'text-decoration', 
                          'text-overflow', 'text-shadow', 'top', 'transform', 'transition', 'user-select', 
                          'vertical-align', 'visibility', 'white-space', 'width', 'word-wrap', 'z-index'],
        UNSUITABLE_FOR_BACKGROUND: new Set(['select', 'option', 'small', 'pre', 'p', 'script', 'a', 'label']),
        EXCLUDED_SELECTORS: ['head', 'body'],
        EXCLUDED_ELEMENTS: ['blacklite-tools'],
        BACKGROUND_FILTERS: {
            opacity: { min: 0, max: 1, step: 0.01, default: 1, unit: '' },
            blur: { min: 0, max: 20, step: 0.1, default: 0, unit: 'px' },
            brightness: { min: 0, max: 2, step: 0.05, default: 1, unit: '' },
            contrast: { min: 0, max: 2, step: 0.05, default: 1, unit: '' },
            grayscale: { min: 0, max: 1, step: 0.01, default: 0, unit: '' },
            'hue-rotate': { min: 0, max: 360, step: 1, default: 0, unit: 'deg' },
            invert: { min: 0, max: 1, step: 0.01, default: 0, unit: '' },
            saturate: { min: 0, max: 2, step: 0.05, default: 1, unit: '' },
            sepia: { min: 0, max: 1, step: 0.01, default: 0, unit: '' }
        }
    };

    const TOOL_ID = 'blacklite-tools';
    const State = {
        activeTab: 'theme',
        themes: {
            default: null,
            savedThemes: {},
            activeTheme: 'Default Theme'
        },
        backgrounds: {
            elements: {},
            filters: {}
        }
    };

    // =============================================
    // UTILITY FUNCTIONS
    // =============================================
    function escapeSelector(selector) {
        return selector.replace(/([!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~])/g, '\\$&').replace(/\*/g, '.*');
    }

    function debounce(func, delay) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    function isExcludedElement(selector) {
        return selector.includes(TOOL_ID) ||
               selector === '.background-overlay' ||
               CONFIG.EXCLUDED_ELEMENTS.some(excluded => selector.includes(excluded));
    }

    function isElementSuitableForBackground(selector) {
        try {
            if (isExcludedElement(selector)) {
                return false;
            }

            const baseSelector = selector.split(':')[0].toLowerCase();
            
            const unsuitableElements = CONFIG.UNSUITABLE_FOR_BACKGROUND;
            
            const cleanSelector = baseSelector.replace(/[.#[\]]/g, '').toLowerCase();
            
            if (/^[a-z]/.test(cleanSelector)) {
                return !unsuitableElements.has(cleanSelector);
            }
            
            const elements = document.querySelectorAll(selector);
            if (elements.length === 0) return true;
            
            return Array.from(elements).every(el => {
                const tagName = el.tagName.toLowerCase();
                return !unsuitableElements.has(tagName);
            });
            
        } catch (e) {
            console.error('Error checking background suitability:', e);
            return false;
        }
    }

    // =============================================
    // CORE MANAGERS
    // =============================================

    // 1. UIManager - Handles all UI rendering and tab management
    const UIManager = {
        toolsContainer: null,
        handleCoreClick: null,
        lastAppliedStyles: null,
        
        init() {
            console.log('Initializing UIManager');
            this.createToolContainer();
            this.setupBaseStyles();
            this.attachGlobalEvents();
            this.render();
        },
        
        createToolContainer() {
            this.toolsContainer = document.createElement('div');
            this.toolsContainer.id = TOOL_ID;
            this.toolsContainer.className = 'BLTOOL-blacklite-tools';
            document.body.appendChild(this.toolsContainer);
        },
        
        setupBaseStyles() {
            const defaultThemeStyleSheet = document.createElement('style');
            defaultThemeStyleSheet.type = 'text/css';
            defaultThemeStyleSheet.innerText = BLTOOLSLitedefaultThemeCSS;
            defaultThemeStyleSheet.id = 'bltool-default-styles';
            document.head.appendChild(defaultThemeStyleSheet);

            const toolSpecificStyleSheet = document.createElement('style');
            toolSpecificStyleSheet.type = 'text/css';
            toolSpecificStyleSheet.innerText = BLTOOLspecificstyles;
            toolSpecificStyleSheet.id = 'bltool-tool-styles';
            document.head.appendChild(toolSpecificStyleSheet);

            this.dynamicStyleElement = document.createElement('style');
            this.dynamicStyleElement.id = 'bltool-theme-styles';
            this.dynamicStyleElement.type = 'text/css';
            document.head.appendChild(this.dynamicStyleElement);
        },
        
        attachGlobalEvents() {
            window.addEventListener('resize', debounce(this.handleResize.bind(this), 250));
        },

        handleResize() {
            if (window.innerWidth <= CONFIG.MOBILE_BREAKPOINT) {
                this.toolsContainer.style.width = '90%';
                this.toolsContainer.style.left = '5%';
                this.toolsContainer.style.right = 'auto';
            } else {
                this.toolsContainer.style.width = '350px';
                this.toolsContainer.style.left = 'auto';
                this.toolsContainer.style.right = '20px';
            }
        },
        
        render() {
            try {
                console.log('Starting UI render for tab:', State.activeTab);
                
                const scrollContainer = this.toolsContainer.querySelector('.BLTOOL-scroll-container');
                const scrollPosition = scrollContainer ? scrollContainer.scrollTop : 0;

                const content = `
                    <div style="margin-bottom: 5px;">
                        <h3 style="font-size: 22px; margin: 0; padding: 0; width: 100%;">BlackLite UI Customization Tool</h3>
                    </div>
                    <div style="display: flex; margin-bottom: 10px;">
                        <div class="BLTOOL-tab-button ${State.activeTab === 'theme' ? 'BLTOOL-active-tab' : ''}" data-tab="theme">Theme</div>
                        <div class="BLTOOL-tab-button ${State.activeTab === 'backgrounds' ? 'BLTOOL-active-tab' : ''}" data-tab="backgrounds">Backgrounds</div>
                        <div class="BLTOOL-tab-button ${State.activeTab === 'presets' ? 'BLTOOL-active-tab' : ''}" data-tab="presets">Presets</div>
                    </div>
                    ${this.renderTabContent()}
                `;

                this.toolsContainer.innerHTML = content;
                console.log('UI content rendered');

                const newScrollContainer = this.toolsContainer.querySelector('.BLTOOL-scroll-container');
                if (newScrollContainer) {
                    newScrollContainer.scrollTop = scrollPosition;
                }

                this.attachCoreEventListeners();
                console.log('Core listeners attached');

                console.log('Attaching tab-specific listeners');
                switch (State.activeTab) {
                    case 'theme':
                        ThemeManager.attachEventListeners();
                        break;
                    case 'backgrounds':
                        BackgroundManager.attachEventListeners();
                        break;
                    case 'presets':
                        PresetManager.attachEventListeners();
                        break;
                }

            } catch (e) {
                console.error('Error during render:', e);
            }
        },
        
        renderTabContent() {
            switch (State.activeTab) {
                case 'theme':
                    return ThemeManager.renderThemeTab();
                case 'backgrounds':
                    return BackgroundManager.renderBackgroundsTab();
                case 'presets':
                    return PresetManager.renderPresetsTab();
                default:
                    return ThemeManager.renderThemeTab();
            }
        },
        
        attachCoreEventListeners() {
            console.log('Attaching core event listeners...');
            
            if (this.handleCoreClick) {
                this.toolsContainer.removeEventListener('click', this.handleCoreClick);
            }
            
            this.handleCoreClick = (e) => {
                const tabButton = e.target.closest('.BLTOOL-tab-button');
                if (tabButton) {
                    e.preventDefault();
                    State.activeTab = tabButton.dataset.tab;
                    this.render();
                }
            };
            
            this.toolsContainer.addEventListener('click', this.handleCoreClick);
        },
        
        cleanup() {
            if (this.handleCoreClick) {
                this.toolsContainer.removeEventListener('click', this.handleCoreClick);
                this.handleCoreClick = null;
            }
            
            if (this.toolsContainer && this.toolsContainer.parentNode) {
                this.toolsContainer.parentNode.removeChild(this.toolsContainer);
            }
        }
    };

    // 2. InspectorManager - Unified inspector functionality
    const InspectorManager = {
        activeInspector: null,
        lastHighlightedElement: null,
        currentFilterInputId: null,
        handleMouseOver: null,
        handleClick: null,
        
        startInspector(type, onSelection, filterInputId = null) {
            this.stopInspector();
            this.activeInspector = type;
            this.currentFilterInputId = filterInputId;
            
            document.body.style.cursor = 'crosshair';
            
            this.handleMouseOver = (event) => {
                if (event.target.closest(`#${TOOL_ID}`)) return;
                
                if (this.lastHighlightedElement) {
                    this.lastHighlightedElement.style.outline = '';
                }
                
                event.target.style.outline = '2px solid #ff0000';
                this.lastHighlightedElement = event.target;
                
                const selector = this.generateSelector(event.target);
                if (this.currentFilterInputId) {
                    const filterInput = document.getElementById(this.currentFilterInputId);
                    if (filterInput) filterInput.value = selector;
                }
            };
            
            this.handleClick = (event) => {
                if (event.target.closest(`#${TOOL_ID}`)) return;
                event.preventDefault();
                event.stopPropagation();
                
                const selector = this.generateSelector(event.target);
                if (typeof onSelection === 'function') {
                    onSelection(selector);
                }
                this.stopInspector();
            };
            
            document.addEventListener('mouseover', this.handleMouseOver, true);
            document.addEventListener('click', this.handleClick, true);
            
            UIManager.render();
        },
        
        stopInspector() {
            document.body.style.cursor = '';
            
            if (this.lastHighlightedElement) {
                this.lastHighlightedElement.style.outline = '';
                this.lastHighlightedElement = null;
            }
            
            if (this.handleMouseOver) {
                document.removeEventListener('mouseover', this.handleMouseOver, true);
                this.handleMouseOver = null;
            }
            
            if (this.handleClick) {
                document.removeEventListener('click', this.handleClick, true);
                this.handleClick = null;
            }
            
            this.activeInspector = null;
            this.currentFilterInputId = null;
            
            UIManager.render();
        },
        
        generateSelector(element) {
            let selectorParts = [];
            if (element.id) {
                selectorParts.push(`#${escapeSelector(element.id)}`);
            }
            if (element.className && typeof element.className === 'string') {
                const classes = element.className.split(' ').filter(c => c.trim() !== '');
                if (classes.length > 0) {
                    selectorParts.push(classes.map(c => `.${escapeSelector(c)}`).join(''));
                }
            }
            if (selectorParts.length === 0) {
                selectorParts.push(element.tagName.toLowerCase());
            }
            return selectorParts.join('');
        },
        
        cleanup() {
            this.stopInspector();
        }
    };

    // 3. FilterManager - Handles all filtering logic
    const FilterManager = {
        applyFilter(searchTerm, items, matchFn) {
            if (!searchTerm.trim()) return items;
            return items.filter(item => matchFn(searchTerm, item));
        },
        
        matchesFilter(searchTerm, text) {
            if (!searchTerm) return true;
            const sanitizedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const pattern = new RegExp(sanitizedTerm, 'i');
            return pattern.test(text);
        }
    };

    // =============================================
    // TAB-SPECIFIC MANAGERS
    // =============================================
    
    // 1. ThemeManager
    const ThemeManager = {
        originalStyles: {},
        currentStyles: {},
        searchTerm: '',
        collapsedSelectors: new Set(),
        showOnlyChangedElements: false,
        applyDebounce: null,
        lastAppliedStyles: null,
        handleThemeChange: null,
        handleThemeClick: null,
        
        init() {
            console.log('Initializing Improved ThemeManager');
            this.originalStyles = {};
            this.currentStyles = {};
            this.collapsedSelectors.clear();
            this.captureBaseStyles();
            
            State.themes.default = JSON.parse(JSON.stringify(this.originalStyles));
            
            Object.keys(this.originalStyles).forEach(selector => {
                this.collapsedSelectors.add(selector);
            });
        },
        
        captureBaseStyles() {
            try {
                console.log('Starting style capture...');
                const allElements = document.querySelectorAll('*');
                const processedSelectors = new Set();
                
                // Add body and html elements explicitly
                if (!this.isElementExcluded(document.body)) {
                    this.captureElementStyles('body', document.body);
                    processedSelectors.add('body');
                }
                if (!this.isElementExcluded(document.documentElement)) {
                    this.captureElementStyles('html', document.documentElement);
                    processedSelectors.add('html');
                }

                allElements.forEach(el => {
                    if (this.isElementExcluded(el)) return;
                    
                    const selectors = this.generateAllPossibleSelectors(el);
                    
                    selectors.forEach(selector => {
                        if (!selector || processedSelectors.has(selector)) return;
                        
                        processedSelectors.add(selector);
                        this.captureElementStyles(selector, el);
                    });
                });
                
                console.log('Style capture completed. Found:', Object.keys(this.originalStyles).length, 'selectors');
            } catch (error) {
                console.error('Error capturing base styles:', error);
            }
        },

        generateAllPossibleSelectors(el) {
            const selectors = [];
            
            // 1. ID selector
            if (el.id && !el.id.includes(TOOL_ID)) {
                selectors.push(`#${el.id}`);
            }
            
            // 2. Class selector(s)
            if (el.className && typeof el.className === 'string') {
                const classes = el.className.split(' ').filter(c => c.trim() !== '');
                if (classes.length > 0) {
                    selectors.push(classes.map(c => `.${escapeSelector(c)}`).join(''));
                    classes.forEach(c => selectors.push(`.${escapeSelector(c)}`));
                }
            }
            
            // 3. Tag selector
            selectors.push(el.tagName.toLowerCase());
            
            // 4. Combined selector (tag.class)
            if (el.className && typeof el.className === 'string') {
                const classes = el.className.split(' ').filter(c => c.trim() !== '');
                if (classes.length > 0) {
                    selectors.push(`${el.tagName.toLowerCase()}${classes.map(c => `.${escapeSelector(c)}`).join('')}`);
                }
            }
            
            return selectors.filter((v, i, a) => a.indexOf(v) === i);
        },
        
        captureElementStyles(selector, element) {
            try {
                const computedStyle = window.getComputedStyle(element);
                this.originalStyles[selector] = {};
                this.currentStyles[selector] = {};

                CONFIG.PRESERVED_STYLES.forEach(prop => {
                    const value = computedStyle.getPropertyValue(prop);
                    if (value && value !== 'initial' && value !== 'inherit') {
                        this.originalStyles[selector][prop] = value;
                        this.currentStyles[selector][prop] = value;
                    }
                });
            } catch (error) {
                console.warn(`Error capturing styles for ${selector}:`, error);
            }
        },
        
        isElementExcluded(element) {
            if (!element || !element.tagName) return true;
            const tagName = element.tagName.toLowerCase();

            if (tagName === 'body' || tagName === 'html') {
                return element.closest(`#${TOOL_ID}`) ||
                       element.id === TOOL_ID ||
                       element.className.includes('BLTOOL') ||
                       element.hasAttribute('data-bltool-exclude');
            }
            
            return CONFIG.EXCLUDED_SELECTORS.includes(tagName) ||
                   element.closest(`#${TOOL_ID}`) ||
                   element.id === TOOL_ID ||
                   element.className.includes('BLTOOL') ||
                   element.hasAttribute('data-bltool-exclude');
        },
        
        isSelectorExcluded(selector) {
            if (!selector) return true;
            return selector.includes(TOOL_ID) ||
                   selector.includes('BLTOOL') ||
                   selector === '.background-overlay' ||
                   selector.includes('script') ||
                   selector.includes('style') ||
                   selector.includes('meta');
        },
        
        renderThemeTab() {
            try {
                return `
                    <div style="display: flex; margin-bottom: 5px; align-items: center;">
                        <input type="text" id="theme-filter" placeholder="Filter selectors..." 
                            style="flex:1; padding: 4px 6px; color: black; height: 28px;" 
                            value="${this.searchTerm}">
                        <button id="clear-filter" class="BLTOOL-button BLTOOL-button-danger" 
                                style="margin-left: 5px; height: 28px;" 
                                ${!this.searchTerm ? 'disabled' : ''}>X</button>
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 5px;">
                        <button class="BLTOOL-button BLTOOL-button-${InspectorManager.activeInspector === 'theme' ? 'danger' : 'primary'}" 
                                id="toggle-inspector">
                            ${InspectorManager.activeInspector === 'theme' ? 'Stop Inspector' : 'Inspector 🔍'}
                        </button>
                        <button id="toggle-collapse" class="BLTOOL-button BLTOOL-button-secondary" style="flex: 1 1 48%;">
                            ${this.collapsedSelectors.size === Object.keys(this.originalStyles).length ? 'Open ALL' : 'Close ALL'}
                        </button>
                        <button id="filter-changes-button" class="BLTOOL-button BLTOOL-button-toggle" style="flex: 1 1 100%;">
                            ${this.showOnlyChangedElements ? 'Show All Elements' : 'Show Only Changed Elements'}
                        </button>
                    </div>
                    <div class="BLTOOL-scroll-container" style="max-height: 475px; overflow-y: auto; width: 100%; box-sizing: border-box;">
                        ${this.renderStyleGroups()}
                    </div>
                `;
            } catch (e) {
                console.error('Error rendering theme tab:', e);
                return '<div>Error rendering theme tab</div>';
            }
        },
    
        renderStyleGroups() {
            try {
                const allSelectors = Object.keys(this.currentStyles);
                if (allSelectors.length === 0) {
                    return `<div style="padding: 10px; color: #aaa;">No elements found for customization.</div>`;
                }

                const filteredSelectors = allSelectors
                    .filter(selector => !this.isSelectorExcluded(selector))
                    .filter(selector => {
                        if (this.searchTerm && !FilterManager.matchesFilter(this.searchTerm, selector)) {
                            return false;
                        }
                        
                        if (this.showOnlyChangedElements) {
                            const originalStyles = this.originalStyles[selector] || {};
                            const currentStyles = this.currentStyles[selector] || {};
                            const hasChanges = Object.keys(currentStyles).some(
                                prop => currentStyles[prop] && currentStyles[prop] !== originalStyles[prop]
                            );
                            return hasChanges;
                        }
                        
                        return true;
                    });

                if (filteredSelectors.length === 0) {
                    return `<div style="padding: 10px; color: #aaa;">No matching elements found.</div>`;
                }

                return filteredSelectors.map(selector => {
                    const isCollapsed = this.collapsedSelectors.has(selector);
                    const styles = this.currentStyles[selector] || {};
                    const originalStyles = this.originalStyles[selector] || {};
                    
                    const filteredProps = Object.keys(styles).filter(prop => {
                        return CONFIG.PRESERVED_STYLES.includes(prop);
                    });

                    return `
                        <div style="margin-top: 5px;">
                            <div class="BLTOOL-selector-toggle" data-selector="${selector}"
                                style="cursor: pointer; padding: 5px; background-color: #2e2e2e; color: white;">
                                ${selector}
                                <span style="float:right;">${isCollapsed ? '▶' : '▼'}</span>
                            </div>
                            ${isCollapsed ? '' : `
                                <div style="background-color: #3e3e3e; margin: 5px 0; padding: 5px;">
                                    ${filteredProps.map(prop => `
                                        <div style="display: flex; align-items: center; margin: 5px 0;">
                                            <span style="flex-grow: 1; margin-right: 10px; color: #aaa;">${prop}</span>
                                            <input
                                                type="${prop.includes('color') ? 'color' : 'text'}"
                                                value="${styles[prop] || ''}"
                                                style="width: 100px; padding: 2px; color: black;"
                                                data-selector="${selector}"
                                                data-prop="${prop}"
                                                class="BLTOOL-style-input"
                                            >
                                            ${styles[prop] !== originalStyles[prop] ? '<span style="color: #91C121; margin-left: 5px;">✓</span>' : ''}
                                        </div>
                                    `).join('')}
                                </div>
                            `}
                        </div>
                    `;
                }).join('');
            } catch (e) {
                console.error('Error rendering style groups:', e);
                return '<div>Error rendering style groups</div>';
            }
        },

        applyAllStylesToDOM() {
            const currentStylesString = JSON.stringify(this.currentStyles);
            if (this.lastAppliedStyles === currentStylesString) {
                return;
            }
            
            this.lastAppliedStyles = currentStylesString;
            
            let cssText = '';
            
            Object.entries(this.currentStyles).forEach(([selector, styles]) => {
                const originalStyles = this.originalStyles[selector] || {};
                const changedStyles = {};
                
                Object.entries(styles).forEach(([prop, value]) => {
                    if (value !== originalStyles[prop]) {
                        changedStyles[prop] = value;
                    }
                });
                
                if (Object.keys(changedStyles).length > 0) {
                    cssText += `${selector} {\n`;
                    Object.entries(changedStyles).forEach(([prop, value]) => {
                        cssText += `  ${prop}: ${value} !important;\n`;
                    });
                    cssText += '}\n\n';
                }
            });
            
            UIManager.dynamicStyleElement.textContent = cssText;
        },
        
        attachEventListeners() {
            const container = document.getElementById(TOOL_ID);
            if (!container) return;

            if (this.handleThemeChange) {
                container.removeEventListener('change', this.handleThemeChange);
            }
            if (this.handleThemeClick) {
                container.removeEventListener('click', this.handleThemeClick);
            }

            const themeFilter = container.querySelector('#theme-filter');
            if (themeFilter) {
                const debouncedFilter = debounce(() => {
                    this.searchTerm = themeFilter.value || '';
                    UIManager.render();
                }, 300);
                
                themeFilter.addEventListener('input', debouncedFilter);
                themeFilter.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') debouncedFilter();
                });
            }

            container.querySelector('#toggle-inspector')?.addEventListener('click', (e) => {
                e.stopPropagation();
                if (InspectorManager.activeInspector === 'theme') {
                    InspectorManager.stopInspector();
                } else {
                    InspectorManager.startInspector(
                        'theme', 
                        (selector) => {
                            this.searchTerm = selector;
                            UIManager.render();
                        },
                        'theme-filter'
                    );
                }
            });

            this.handleThemeClick = (e) => {
                if (e.target.id === 'toggle-inspector') {
                    if (InspectorManager.activeInspector === 'theme') {
                        InspectorManager.stopInspector();
                    } else {
                        InspectorManager.startInspector('theme-filter', (selector) => {
                            this.searchTerm = selector;
                            UIManager.render();
                        });
                    }
                    return;
                }
                
                if (e.target.id === 'toggle-collapse') {
                    const allSelectors = Object.keys(this.originalStyles);
                    const isAllCollapsed = allSelectors.every(selector => this.collapsedSelectors.has(selector));
                    this.collapsedSelectors = isAllCollapsed ? new Set() : new Set(allSelectors);
                    UIManager.render();
                    return;
                }

                if (e.target.id === 'filter-changes-button') {
                    this.showOnlyChangedElements = !this.showOnlyChangedElements;
                    UIManager.render();
                    return;
                }
                
                if (e.target.id === 'clear-filter') {
                    this.searchTerm = '';
                    UIManager.render();
                    return;
                }
                
                if (e.target.classList.contains('BLTOOL-selector-toggle')) {
                    const selector = e.target.dataset.selector;
                    if (this.collapsedSelectors.has(selector)) {
                        this.collapsedSelectors.delete(selector);
                    } else {
                        this.collapsedSelectors.add(selector);
                    }
                    UIManager.render();
                }
            };

            this.handleThemeChange = (e) => {
                if (e.target.classList.contains('BLTOOL-style-input')) {
                    const selector = e.target.dataset.selector;
                    const prop = e.target.dataset.prop;
                    const value = e.target.value;
                    this.updateStyle(selector, prop, value);
                }
            };

            container.addEventListener('click', this.handleThemeClick);
            container.addEventListener('change', this.handleThemeChange);
        },
        
        updateStyle(selector, prop, value) {
            try {
                if (!this.currentStyles[selector]) {
                    this.currentStyles[selector] = {};
                }
                this.currentStyles[selector][prop] = value;
                
                if (!this.applyDebounce) {
                    this.applyDebounce = debounce(() => {
                        this.applyAllStylesToDOM();
                        PresetManager.markAsUnsaved();
                        this.applyDebounce = null;
                    }, 100);
                }
                this.applyDebounce();
            } catch (e) {
                console.warn(`Could not apply style for selector: ${selector}`, e);
            }
        },
        
        showChanges() {
            try {
                const classicChecked = document.getElementById('theme-classic')?.checked || false;
                const aestheticChecked = document.getElementById('theme-aesthetic')?.checked || false;
                const corpoChecked = document.getElementById('theme-corpo')?.checked || false;

                let cssText = `/*\nBlackLite Custom Theme\n`;
                cssText += `Theme-Name: ${document.getElementById('preset-name')?.value || 'Custom'}\n`;
                cssText += `Theme-Description: ${document.getElementById('preset-description')?.value || 'No description'}\n`;
                cssText += `Creator: ${document.getElementById('preset-creator')?.value || 'Anonymous'}\n`;
                cssText += `Compatibility: ${classicChecked ? 'Classic' : ''}${aestheticChecked ? (classicChecked ? ', Aesthetic' : 'Aesthetic') : ''}${corpoChecked ? ((classicChecked || aestheticChecked) ? ', Corpo' : 'Corpo') : ''}\n`;
                cssText += `Date: ${new Date().toISOString()}\n*/\n\n`;
                
                let hasChanges = false;
                
                Object.entries(this.currentStyles).forEach(([selector, styles]) => {
                    const originalStyles = this.originalStyles[selector] || {};
                    const changedStyles = {};
                    
                    Object.entries(styles).forEach(([prop, value]) => {
                        if (value !== originalStyles[prop]) {
                            changedStyles[prop] = value;
                        }
                    });
                    
                    if (Object.keys(changedStyles).length > 0) {
                        hasChanges = true;
                        cssText += `${selector} {\n`;
                        Object.entries(changedStyles).forEach(([prop, value]) => {
                            cssText += `  ${prop}: ${value};\n`;
                        });
                        cssText += '}\n\n';
                    }
                });

                Object.entries(State.backgrounds.elements).forEach(([selector, imageData]) => {
                    if (imageData) {
                        hasChanges = true;
                        cssText += `${selector} {\n`;
                        cssText += `  /* background-image: data is too large to display here */\n`;
                        cssText += `  background-size: cover;\n`;
                        cssText += `  background-position: center;\n`;
                        
                        const filters = State.backgrounds.filters[selector] || {};
                        Object.entries(filters).forEach(([filter, value]) => {
                            const config = CONFIG.BACKGROUND_FILTERS[filter];
                            if (value !== config.default) {
                                cssText += `  ${filter}: ${value}${config.unit};\n`;
                            }
                        });
                        
                        cssText += '}\n\n';
                    }
                });

                if (!hasChanges) {
                    cssText += '/* No changes detected */';
                }

                const win = window.open('', '_blank', 'width=600,height=500');
                if (win) {
                    win.document.write(`
                        <html>
                            <head>
                                <title>Theme Changes</title>
                                <style>
                                    body { font-family: monospace; padding: 20px; background: #1a1a1a; color: #fff; }
                                    pre { white-space: pre-wrap; word-wrap: break-word; }
                                </style>
                            </head>
                            <body>
                                <h2>Current Theme Changes</h2>
                                <pre>${cssText}</pre>
                                <p><strong>Note:</strong> Background images are not shown in this preview as they would make the file too large for the Browser. Use the "Export Background Images" feature to get the actual images or Export the CSS.</p>
                            </body>
                        </html>
                    `);
                    win.document.close();
                }
            } catch (error) {
                console.error('Error showing changes:', error);
            }
        },
        
        cleanup() {
            if (this.applyDebounce) {
                this.applyDebounce.cancel();
                this.applyDebounce = null;
            }
            
            this.handleThemeChange = null;
            this.handleThemeClick = null;
        }
    };

    // 2. BackgroundManager
    const BackgroundManager = {
        searchTerm: '',
        collapsedSelectors: new Set(),
        selectorsInitialized: false,
        showOnlyWithBackground: false,
        applyDebounce: null,
        handleBgChange: null,
        handleBgClick: null,
        
        init() {
            console.log('Initializing BackgroundManager');
            if (!this.selectorsInitialized) {
                this.collapsedSelectors.clear();
                const allInitialSelectors = Object.keys(ThemeManager.currentStyles)
                    .filter(selector => isElementSuitableForBackground(selector));
                allInitialSelectors.forEach(selector => {
                    this.collapsedSelectors.add(selector);
                });
                this.selectorsInitialized = true;
            }
        },

        applyBackgroundsToDom() {
            let bgStyleElement = document.getElementById('bltool-bg-styles');
            if (!bgStyleElement) {
                bgStyleElement = document.createElement('style');
                bgStyleElement.id = 'bltool-bg-styles';
                document.head.appendChild(bgStyleElement);
            }
            
            let cssText = '';
            
            Object.entries(State.backgrounds.elements).forEach(([selector, imageData]) => {
                if (imageData) {
                    cssText += `${selector} {\n`;
                    cssText += `  background-image: url('${imageData}') !important;\n`;
                    cssText += `  background-size: cover !important;\n`;
                    cssText += `  background-position: center !important;\n`;
                    
                    const filters = State.backgrounds.filters[selector] || {};
                    const filterString = Object.entries(filters)
                        .map(([filter, value]) => {
                            const config = CONFIG.BACKGROUND_FILTERS[filter];
                            if (!config || filter === 'opacity') return '';
                            return `${filter}(${value}${config.unit})`;
                        })
                        .filter(Boolean)
                        .join(' ');
                    
                    if (filterString) {
                        cssText += `  filter: ${filterString} !important;\n`;
                    }
                    
                    if (filters.opacity !== undefined) {
                        cssText += `  opacity: ${filters.opacity} !important;\n`;
                    }
                    
                    cssText += '}\n\n';
                }
            });
            
            bgStyleElement.textContent = cssText;
        },
        
        renderBackgroundsTab() {
            try {
                const isAllCollapsed = Object.keys(ThemeManager.currentStyles)
                    .filter(selector => isElementSuitableForBackground(selector))
                    .every(selector => this.collapsedSelectors.has(selector));
                    
                const toggleText = isAllCollapsed ? 'Open ALL' : 'Close ALL';
                
                return `
                    <div style="display: flex; margin-bottom: 5px; align-items: center;">
                        <input type="text" id="bg-filter" placeholder="Filter elements..." 
                            style="flex:1; padding: 4px 6px; color: black; height: 28px;" 
                            value="${this.searchTerm}">
                        <button id="clear-bg-filter" class="BLTOOL-button BLTOOL-button-danger" 
                                style="margin-left: 5px; height: 28px;" 
                                ${!this.searchTerm ? 'disabled' : ''}>X</button>
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 5px;">
                        <button class="BLTOOL-button BLTOOL-button-${InspectorManager.activeInspector === 'background' ? 'danger' : 'primary'}" 
                                id="toggle-bg-inspector">
                            ${InspectorManager.activeInspector === 'background' ? 'Stop Inspector' : 'Inspector 🔍'}
                        </button>
                        <button id="toggle-bg-collapse" class="BLTOOL-button BLTOOL-button-secondary" style="flex: 1 1 48%;">
                            ${toggleText}
                        </button>
                        <button id="filter-images-button" class="BLTOOL-button BLTOOL-button-toggle" style="flex: 1 1 100%;">
                            ${this.showOnlyWithBackground ? 'Show All Elements' : 'Show Only Elements With Backgrounds'}
                        </button>
                    </div>
                    <div class="BLTOOL-scroll-container" style="max-height: 475px; overflow-y: auto; width: 100%; box-sizing: border-box;">
                        ${this.renderBackgroundSelectors()}
                    </div>
                `;
            } catch (e) {
                console.error('Error rendering backgrounds tab:', e);
                return '<div>Error rendering backgrounds tab</div>';
            }
        },
        
        renderBackgroundSelectors() {
            try {
                let suitableSelectors = Object.keys(ThemeManager.currentStyles)
                    .filter(selector => isElementSuitableForBackground(selector))
                    .filter(selector => !this.searchTerm || FilterManager.matchesFilter(this.searchTerm, selector));

                if (this.showOnlyWithBackground) {
                    suitableSelectors = suitableSelectors.filter(selector =>
                        State.backgrounds.elements[selector]
                    );
                }

                if (suitableSelectors.length === 0) {
                    return `<div style="padding: 10px; color: #aaa;">No suitable elements found for background customization.</div>`;
                }

                return suitableSelectors
                    .map(selector => {
                        const isCollapsed = this.collapsedSelectors.has(selector);
                        const hasBackground = State.backgrounds.elements[selector];
                        const bgImage = State.backgrounds.elements[selector] || '';
                        const filters = State.backgrounds.filters[selector] || {};
                        
                        Object.keys(CONFIG.BACKGROUND_FILTERS).forEach(filter => {
                            if (filters[filter] === undefined) {
                                filters[filter] = CONFIG.BACKGROUND_FILTERS[filter].default;
                            }
                        });

                        return `
                            <div style="margin-top: 5px; width: 100%; box-sizing: border-box;">
                                <div class="BLTOOL-bg-selector-toggle" data-selector="${selector}"
                                    style="cursor: pointer; padding: 5px; background-color: #2e2e2e; color: white; width: 100%; box-sizing: border-box;">
                                    ${selector} ${hasBackground ? '  🖼️  ' : ''}
                                    <span style="float:right;">${isCollapsed ? '▶' : '▼'}</span>
                                </div>
                                ${isCollapsed ? '' : `
                                    <div style="background-color: #3e3e3e; margin: 5px 0; padding: 5px; width: 100%; box-sizing: border-box;">
                                        <div style="margin-bottom: 10px; width: 100%;">
                                            <p style="margin: 5px 0; width: 100%;">Background Image:</p>
                                            <input type="file" class="BLTOOL-bg-file-input" data-selector="${selector}" style="color: white; display: inline-block; width: auto;">
                                            <button class="BLTOOL-button BLTOOL-button-danger" data-selector="${selector}">X</button>
                                            <img id="preview-${selector}" src="${bgImage}" style="max-width: 100%; margin-top: 10px; display: ${bgImage ? 'block' : 'none'}; 
                                                box-sizing: border-box; filter: ${Object.entries(filters)
                                                    .map(([f, val]) => `${f}(${val}${CONFIG.BACKGROUND_FILTERS[f]?.unit || ''})`)
                                                    .join(' ')}">
                                        </div>
                                        ${hasBackground ? `
                                            <div style="margin-top: 10px;">
                                                <h4 style="margin: 10px 0 5px 0;">Image Filters</h4>
                                                ${Object.keys(CONFIG.BACKGROUND_FILTERS).map(filter => {
                                                    const config = CONFIG.BACKGROUND_FILTERS[filter];
                                                    return `
                                                        <div style="margin-bottom: 5px;">
                                                            <label style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span style="flex: 1; text-align: left;">${filter}</span>
                                                                <span id="filter-value-${selector}-${filter}" style="min-width: 50px; text-align: right;">
                                                                    ${filters[filter]}${CONFIG.BACKGROUND_FILTERS[filter].unit}
                                                                </span>
                                                            </label>
                                                            <input type="range" 
                                                                class="BLTOOL-bg-filter-input" 
                                                                data-selector="${selector}" 
                                                                data-filter="${filter}"
                                                                min="${CONFIG.BACKGROUND_FILTERS[filter].min}" 
                                                                max="${CONFIG.BACKGROUND_FILTERS[filter].max}" 
                                                                step="${CONFIG.BACKGROUND_FILTERS[filter].step}" 
                                                                value="${filters[filter]}" 
                                                                style="width: 100%;">
                                                        </div>
                                                    `;
                                                }).join('')}
                                            </div>
                                        ` : ''}
                                    </div>
                                `}
                            </div>
                        `;
                    })
                    .join('');
            } catch (e) {
                console.error('Error rendering background selectors:', e);
                return '<div>Error rendering background selectors</div>';
            }
        },
        
        attachEventListeners() {
            const container = document.getElementById(TOOL_ID);
            if (!container) return;

            if (this.handleBgChange) {
                container.removeEventListener('change', this.handleBgChange);
            }
            if (this.handleBgClick) {
                container.removeEventListener('click', this.handleBgClick);
            }

            this.handleBgChange = (e) => {
                if (e.target.classList.contains('BLTOOL-bg-file-input')) {
                    const selector = e.target.dataset.selector;
                    if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        const reader = new FileReader();

                        reader.onload = (e) => {
                            this.applyBackground(selector, e.target.result);
                            // No need for extra render() here since applyBackground does it
                        };

                        reader.readAsDataURL(file);
                    }
                }
                
                if (e.target.classList.contains('BLTOOL-bg-filter-input')) {
                    const selector = e.target.dataset.selector;
                    const filter = e.target.dataset.filter;
                    const value = parseFloat(e.target.value);
                    
                    const valueDisplay = document.getElementById(`filter-value-${selector}-${filter}`);
                    if (valueDisplay) {
                        valueDisplay.textContent = `${value}${CONFIG.BACKGROUND_FILTERS[filter].unit}`;
                    }
                    
                    this.applyFilter(selector, filter, value);
                }
            };

            container.querySelector('#toggle-bg-inspector')?.addEventListener('click', (e) => {
                e.stopPropagation();
                if (InspectorManager.activeInspector === 'background') {
                    InspectorManager.stopInspector();
                } else {
                    InspectorManager.startInspector(
                        'background', 
                        (selector) => {
                            this.searchTerm = selector;
                            UIManager.render();
                        },
                        'bg-filter'
                    );
                }
            });

            this.handleBgClick = (e) => {
                if (e.target.classList.contains('BLTOOL-bg-selector-toggle')) {
                    e.stopPropagation();
                    const selector = e.target.dataset.selector;
                    if (this.collapsedSelectors.has(selector)) {
                        this.collapsedSelectors.delete(selector);
                    } else {
                        this.collapsedSelectors.add(selector);
                    }
                    UIManager.render();
                }
                
                if (e.target.closest('button') && e.target.closest('button').dataset.selector) {
                    const selector = e.target.closest('button').dataset.selector;
                    this.removeBackground(selector);
                }
                
                if (e.target.id === 'toggle-bg-inspector') {
                    e.stopPropagation();
                    if (InspectorManager.activeInspector === 'background') {
                        InspectorManager.stopInspector();
                    } else {
                        InspectorManager.startInspector('bg-filter', (selector) => {
                            this.searchTerm = selector;
                            UIManager.render();
                        });
                    }
                    return;
                }
                
                if (e.target.id === 'toggle-bg-collapse') {
                    const allSelectors = Object.keys(ThemeManager.currentStyles)
                        .filter(selector => isElementSuitableForBackground(selector));
                    const isAllCollapsed = allSelectors.every(selector => this.collapsedSelectors.has(selector));
                    
                    if (isAllCollapsed) {
                        this.collapsedSelectors.clear();
                    } else {
                        allSelectors.forEach(selector => this.collapsedSelectors.add(selector));
                    }
                    UIManager.render();
                    return;
                }

                if (e.target.id === 'filter-images-button') {
                    this.showOnlyWithBackground = !this.showOnlyWithBackground;
                    UIManager.render();
                    return;
                }
                
                if (e.target.id === 'clear-bg-filter') {
                    this.searchTerm = '';
                    UIManager.render();
                    return;
                }
            };

            container.addEventListener('change', this.handleBgChange);
            container.addEventListener('click', this.handleBgClick);

            const bgFilter = container.querySelector('#bg-filter');
            if (bgFilter) {
                const debouncedFilter = debounce(() => {
                    this.searchTerm = bgFilter.value;
                    UIManager.render();
                }, 300);
                
                bgFilter.addEventListener('input', debouncedFilter);
                bgFilter.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') debouncedFilter();
                });
            }
        },
        
        applyBackground(selector, imageData) {
            try {
                if (isExcludedElement(selector)) return;

                State.backgrounds.elements[selector] = imageData;
                
                if (!State.backgrounds.filters[selector]) {
                    State.backgrounds.filters[selector] = {};
                    Object.keys(CONFIG.BACKGROUND_FILTERS).forEach(filter => {
                        State.backgrounds.filters[selector][filter] = CONFIG.BACKGROUND_FILTERS[filter].default;
                    });
                }

                this.applyBackgroundsToDom();
                UIManager.render();
            } catch (e) {
                console.error(`Could not apply background to ${selector}`, e);
            }
        },

        removeBackground(selector) {
            try {
                if (State.backgrounds.elements[selector]) {
                    delete State.backgrounds.elements[selector];
                    delete State.backgrounds.filters[selector];
                    
                    this.applyBackgroundsToDom();
                    UIManager.render();
                }
            } catch (e) {
                console.error(`Could not remove background from ${selector}`, e);
            }
        },

        applyFilter(selector, filter, value) {
            try {
                if (!State.backgrounds.filters[selector]) {
                    State.backgrounds.filters[selector] = {};
                }
                
                State.backgrounds.filters[selector][filter] = value;
                
                // Update preview image in real-time
                const previewImg = document.getElementById(`preview-${selector}`);
                if (previewImg) {
                    const filters = State.backgrounds.filters[selector] || {};
                    const filterString = Object.entries(filters)
                        .map(([f, val]) => {
                            const config = CONFIG.BACKGROUND_FILTERS[f];
                            return `${f}(${val}${config?.unit || ''})`;
                        })
                        .join(' ');
                    previewImg.style.filter = filterString;
                }
                
                this.applyBackgroundsToDom();
            } catch (e) {
                console.error(`Error applying filter to ${selector}:`, e);
            }
        },
        
        exportAllImages() {
            try {
                const images = Object.entries(State.backgrounds.elements);
                if (images.length === 0) {
                    alert('No background images to export.');
                    return;
                }

                const win = window.open('', '_blank', 'width=600,height=400,left=100,top=100');
                win.document.write(`
                    <html>
                        <head>
                            <title>Export Background Images</title>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #1e1e1e;
                                    color: white;
                                    padding: 20px;
                                }
                                h1 {
                                    margin-top: 0;
                                }
                                ul {
                                    list-style: none;
                                    padding: 0;
                                }
                                li {
                                    margin-bottom: 10px;
                                }
                                a {
                                    color: #337ab7;
                                    text-decoration: none;
                                }
                                a:hover {
                                    text-decoration: underline;
                                }
                                button {
                                    background-color: #337ab7;
                                    color: white;
                                    border: none;
                                    padding: 10px 20px;
                                    cursor: pointer;
                                    margin-top: 20px;
                                }
                                button:hover {
                                    background-color: #286090;
                                }
                            </style>
                        </head>
                        <body>
                            <h1>Export Background Images</h1>
                            ${this.renderImageDownloadList()}
                            <button onclick="window.close()">Close</button>
                        </body>
                    </html>
                `);
                win.document.close();
            } catch (e) {
                console.error('Error preparing image download list:', e);
                alert('Error preparing image download list. Please try again.');
            }
        },
        
        renderImageDownloadList() {
            const images = Object.entries(State.backgrounds.elements);
            if (images.length === 0) {
                return '<p>No background images to display for download.</p>';
            }

            let html = '<ul>';
            images.forEach(([selector, imageData], index) => {
                const safeSelectorName = selector.replace(/[^a-zA-Z0-9_.-]/g, '_').substring(0, 50);
                html += `<li>
                    <span>${selector}:</span><br/>
                    <a href="${imageData}" download="background_${safeSelectorName}_${index + 1}.png">
                        Download Image ${index + 1}
                    </a>
                </li>`;
            });
            html += '</ul>';
            return html;
        },
        
        cleanup() {
            if (this.applyDebounce) {
                this.applyDebounce.cancel();
                this.applyDebounce = null;
            }
            
            this.handleBgChange = null;
            this.handleBgClick = null;
        }
    };

    // 3. PresetManager
 const PresetManager = {
    themes: {},
    currentTheme: 'Default Theme',
    unsavedChanges: false,
    
    init() {
        // Initialize with default theme
        this.themes['Default Theme'] = {
            metadata: {
                name: 'Default Theme',
                description: 'This is the KoboldAI Lite default theme.',
                creator: 'KoboldAI',
                date: new Date().toISOString(),
                classic: true,
                aesthetic: true,
                corpo: true
            },
            css: BLTOOLSLitedefaultThemeCSS,
            backgrounds: {
                elements: {},
                filters: {}
            }
        };
    },
    
    renderPresetsTab() {
        try {
            let optionsHtml = '';
            optionsHtml += `<option value="Default Theme" ${this.currentTheme === 'Default Theme' ? 'selected' : ''}>Default Theme</option>`;

            Object.keys(this.themes)
                .filter(name => name !== 'Default Theme')
                .forEach(name => {
                    optionsHtml += `<option value="${name}" ${this.currentTheme === name ? 'selected' : ''}>${name}</option>`;
                });

            if (this.unsavedChanges) {
                optionsHtml += `<option value="unsaved" selected>Unsaved Changes</option>`;
            }

            const currentTheme = this.themes[this.currentTheme] || this.themes['Default Theme'];

            return `
                <div style="margin-bottom: 10px; padding: 10px; background-color: #2e2e2e;">
                    <h4 style="margin-top: 0; margin-bottom: 5px;">Current Theme</h4>
                    <select id="preset-select" style="width: 100%; padding: 5px; color: black; margin-bottom: 5px;">
                        ${optionsHtml}
                    </select>
                    <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                        <button id="apply-preset" class="BLTOOL-button BLTOOL-button-primary" style="flex: 1 1 48%;">Apply Theme</button>
                        <button id="save-preset" class="BLTOOL-button BLTOOL-button-secondary" style="flex: 1 1 48%;">Save Theme</button>
                        <button id="show-css-button" class="BLTOOL-button BLTOOL-button-secondary" style="width: 100%; margin-top: 0px;">Show changes as CSS</button>
                        <button id="delete-preset" class="BLTOOL-button BLTOOL-button-danger" style="width: 100%; margin-top: 0px;">Delete Selected Theme</button>
                    </div>
                </div>
                <div style="margin-bottom: 10px; padding: 10px; background-color: #2e2e2e;">
                    <h4 style="margin-top: 0; margin-bottom: 5px;">Theme Overview</h4>
                    <input type="text" id="preset-name" placeholder="Theme Name (e.g., My Dark Mode)" style="width: 100%; margin-bottom: 5px; color: black; padding: 4px; box-sizing: border-box;" value="${currentTheme.metadata.name || ''}">
                    <input type="text" id="preset-creator" placeholder="Author (e.g., Your Name)" style="width: 100%; margin-bottom: 5px; color: black; padding: 4px; box-sizing: border-box;" value="${currentTheme.metadata.creator || ''}">
                    <textarea id="preset-description" placeholder="Theme Description (optional)" style="width: 100%; height: 60px; resize: vertical; margin-bottom: 5px; color: black; padding: 4px; box-sizing: border-box;">${currentTheme.metadata.description || ''}</textarea>
                    <div class="BLTOOL-checkbox-container">
                        <h4 style="margin-top: 10px; margin-bottom: 5px;">Theme is compatible with:</h4>
                        <label style="display: inline-block; margin-right: 10px;"><input type="checkbox" id="theme-classic" data-theme-type="classic" ${currentTheme.metadata.classic ? 'checked' : ''}> Classic</label>
                        <label style="display: inline-block; margin-right: 10px;"><input type="checkbox" id="theme-aesthetic" data-theme-type="aesthetic" ${currentTheme.metadata.aesthetic ? 'checked' : ''}> Aesthetic</label>
                        <label style="display: inline-block;"><input type="checkbox" id="theme-corpo" data-theme-type="corpo" ${currentTheme.metadata.corpo ? 'checked' : ''}> Corpo</label>
                    </div>
                </div>
                <div style="margin-bottom: 10px; padding: 10px; background-color: #2e2e2e;">
                    <h4 style="margin-top: 0; margin-bottom: 5px;">Theme Actions</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                        <button id="import-preset" class="BLTOOL-button BLTOOL-button-secondary" style="flex: 1 1 48%;">Import CSS Files</button>
                        <button id="export-preset" class="BLTOOL-button BLTOOL-button-secondary" style="flex: 1 1 48%;">Export All as CSS</button>
                        <button id="reset-to-default" class="BLTOOL-button BLTOOL-button-danger" style="width: 100%; margin-top: 0px;">Reset Everything</button>
                    </div>
                </div>
                <div style="margin-top: 0px; padding: 10px; background-color: #2e2e2e;">
                    <h4 style="margin-top: 0; margin-bottom: 5px;">Additional Export Actions</h4>
                    <button id="export-default" class="BLTOOL-button BLTOOL-button-secondary" style="width: 100%; margin-bottom: 5px;">Export Default Theme as CSS</button>
                    <button id="export-css-button" class="BLTOOL-button BLTOOL-button-secondary" style="width: 100%; margin-bottom: 5px;">Export Current Changes as CSS</button>
                    <button id="export-images" class="BLTOOL-button BLTOOL-button-toggle" style="width: 100%;">Export Current Background Images</button>
                    <div id="BLTOOL-image-download-list-container" style="margin-top:7px;"></div>
                </div>
            `;
        } catch (e) {
            console.error('Error rendering presets tab:', e);
            return '<div style="color:red;">Error rendering presets tab. Check console for details.</div>';
        }
    },
    
    attachEventListeners() {
        const container = document.getElementById(TOOL_ID);
        if (!container) return;

        // Save preset button
        container.querySelector('#save-preset')?.addEventListener('click', () => {
            const name = document.getElementById('preset-name').value.trim();
            const description = document.getElementById('preset-description').value.trim();
            const creator = document.getElementById('preset-creator').value.trim();
            const classic = document.getElementById('theme-classic')?.checked || false;
            const aesthetic = document.getElementById('theme-aesthetic')?.checked || false;
            const corpo = document.getElementById('theme-corpo')?.checked || false;
            
            if (!name || name === 'Default Theme') {
                alert('Please enter a valid theme name (cannot be "Default Theme")');
                return;
            }
            
            this.saveCurrentChangesAsTheme(name, description, creator, classic, aesthetic, corpo);
        });

        // Apply preset button
        container.querySelector('#apply-preset')?.addEventListener('click', () => {
            const selectedPreset = document.getElementById('preset-select').value;
            this.applyTheme(selectedPreset);
        });

        // Delete preset button
        container.querySelector('#delete-preset')?.addEventListener('click', () => {
            const selectedPreset = document.getElementById('preset-select').value;
            if (selectedPreset && selectedPreset !== 'Default Theme') {
                this.deleteTheme(selectedPreset);
            } else {
                alert('Cannot delete the Default Theme');
            }
        });

        // Reset everything button
        container.querySelector('#reset-to-default')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset everything? All saved themes will be deleted, and the UI will revert to the Default Theme.')) {
                this.resetEverything();
            }
        });

        // Import themes button
        container.querySelector('#import-preset')?.addEventListener('click', () => {
            this.importCSSFiles();
        });

        // Export all themes button
        container.querySelector('#export-preset')?.addEventListener('click', () => {
            this.exportAllThemesAsCSS();
        });

        // Export default theme button
        container.querySelector('#export-default')?.addEventListener('click', () => {
            this.exportDefaultThemeAsCSS();
        });

        // Export current changes button
        container.querySelector('#export-css-button')?.addEventListener('click', () => {
            this.exportCurrentChangesAsCSS();
        });

        // Export images button
        container.querySelector('#export-images')?.addEventListener('click', () => {
            BackgroundManager.exportAllImages();
        });

        // Show CSS button
        container.querySelector('#show-css-button')?.addEventListener('click', () => {
            ThemeManager.showChanges();
        });

        // Preset select dropdown
        const presetSelect = container.querySelector('#preset-select');
        if (presetSelect) {
            presetSelect.addEventListener('change', (e) => {
                this.updateThemeInfo(e.target.value);
            });
        }
    },
    
    resetEverything() {
        // Reset to default theme -> everything to start!
        this.themes = {
            'Default Theme': {
                metadata: {
                    name: 'Default Theme',
                    description: 'This is the KoboldAI Lite default theme.',
                    creator: 'KoboldAI',
                    date: new Date().toISOString(),
                    classic: true,
                    aesthetic: true,
                    corpo: true
                },
                css: BLTOOLSLitedefaultThemeCSS,
                backgrounds: {
                    elements: {},
                    filters: {}
                }
            }
        };
        
        this.currentTheme = 'Default Theme';
        this.unsavedChanges = false;
        
        this.applyTheme('Default Theme');
        
        UIManager.dynamicStyleElement.textContent = '';
        
        State.backgrounds.elements = {};
        State.backgrounds.filters = {};
        BackgroundManager.applyBackgroundsToDom();
        
        UIManager.render();
    },
    
    applyTheme(themeName) {
        try {
            if (themeName === 'unsaved') {
                return;
            }

            const theme = this.themes[themeName];
            if (!theme) {
                console.warn(`Theme "${themeName}" not found`);
                return;
            }

            UIManager.dynamicStyleElement.textContent = theme.css;
            
            State.backgrounds.elements = JSON.parse(JSON.stringify(theme.backgrounds?.elements || {}));
            State.backgrounds.filters = JSON.parse(JSON.stringify(theme.backgrounds?.filters || {}));
            BackgroundManager.applyBackgroundsToDom();
            
            this.currentTheme = themeName;
            this.unsavedChanges = false;
            
            UIManager.render();
        } catch (e) {
            console.error(`Error applying theme "${themeName}":`, e);
            this.applyTheme('Default Theme');
        }
    },
    
    saveCurrentChangesAsTheme(name, description = '', creator = '', classic = false, aesthetic = false, corpo = false) {
        try {
            const currentCSS = UIManager.dynamicStyleElement.textContent;
            
            const newTheme = {
                metadata: {
                    name: name.trim(),
                    description: description.trim(),
                    creator: creator.trim(),
                    date: new Date().toISOString(),
                    classic,
                    aesthetic,
                    corpo
                },
                css: currentCSS,
                backgrounds: {
                    elements: JSON.parse(JSON.stringify(State.backgrounds.elements)),
                    filters: JSON.parse(JSON.stringify(State.backgrounds.filters))
                }
            };
                
                let finalName = name;
                let counter = 1;
                while (this.themes[finalName]) {
                    finalName = `${name} (${counter})`;
                    counter++;
                }
                
                this.themes[finalName] = newTheme;
                this.currentTheme = finalName;
                this.unsavedChanges = false;
                
                UIManager.render();
                return true;
            } catch (e) {
                console.error('Error saving theme:', e);
                alert('Error saving theme: ' + e.message);
                return false;
            }
        },
        
        deleteTheme(themeName) {
            try {
                if (!this.themes[themeName]) {
                    console.warn(`Theme "${themeName}" not found`);
                    return;
                }

                if (confirm(`Are you sure you want to delete the theme "${themeName}"?`)) {
                    delete this.themes[themeName];
                    
                    if (this.currentTheme === themeName) {
                        this.applyTheme('Default Theme');
                    }
                    
                    UIManager.render();
                }
            } catch (e) {
                console.error(`Error deleting theme "${themeName}":`, e);
                alert('Error deleting theme: ' + e.message);
            }
        },
        
        importCSSFiles() {
            try {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = '.css';
                fileInput.multiple = true;
                fileInput.style.display = 'none';
                document.body.appendChild(fileInput);

                fileInput.addEventListener('change', (e) => {
                    if (e.target.files && e.target.files.length > 0) {
                        let importedCount = 0;
                        
                        Array.from(e.target.files).forEach(file => {
                            if (file.name.endsWith('.css')) {
                                const reader = new FileReader();
                                
                                reader.onload = (event) => {
                                    try {
                                        const cssContent = event.target.result;
                                        const themeName = file.name.replace('.css', '').replace(/^theme-/, '');
                                        
                                        const newTheme = {
                                            metadata: {
                                                name: themeName,
                                                description: 'Imported from ' + file.name,
                                                creator: 'Imported',
                                                date: new Date().toISOString(),
                                                classic: true,
                                                aesthetic: true,
                                                corpo: true
                                            },
                                            css: cssContent,
                                            backgrounds: {
                                                elements: {},
                                                filters: {}
                                            }
                                        };
                                        
                                        let finalName = themeName;
                                        let counter = 1;
                                        while (this.themes[finalName]) {
                                            finalName = `${themeName} (${counter})`;
                                            counter++;
                                        }
                                        
                                        this.themes[finalName] = newTheme;
                                        importedCount++;
                                        
                                        if (importedCount === e.target.files.length) {
                                            UIManager.render();
                                            alert(`Successfully imported ${importedCount} themes.`);
                                        }
                                    } catch (err) {
                                        console.error(`Error processing CSS file ${file.name}:`, err);
                                    }
                                };
                                
                                reader.readAsText(file);
                            }
                        });
                    }
                    document.body.removeChild(fileInput);
                });

                fileInput.click();
            } catch (e) {
                console.error('Error importing CSS files:', e);
                alert('Error importing CSS files: ' + e.message);
            }
        },
        
        exportAllThemesAsCSS() {
            try {
                const themes = { ...this.themes };
                themes['Default Theme'] = this.getDefaultThemeData();

                let downloadCount = 0;
                const totalThemes = Object.keys(themes).length;

                Object.entries(themes).forEach(([themeName, themeData], index) => {
                    setTimeout(() => {
                        const css = this.convertThemeToCSS(themeData);
                        const safeFileName = themeName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                        
                        const blob = new Blob([css], { type: 'text/css' });
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(blob);
                        link.download = `theme-${safeFileName || 'unnamed'}.css`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        URL.revokeObjectURL(link.href);
                        
                        downloadCount++;
                        if (downloadCount === totalThemes) {
                            alert(`Successfully exported ${totalThemes} themes as CSS files.`);
                        }
                    }, index * 500);
                });
            } catch (e) {
                console.error('Error exporting all themes as CSS:', e);
                alert('Error exporting themes: ' + e.message);
            }
        },
        
        exportDefaultThemeAsCSS() {
            try {
                const defaultThemeData = this.getDefaultThemeData();
                const css = this.convertThemeToCSS(defaultThemeData);
                
                const blob = new Blob([css], { type: 'text/css' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'theme-default.css';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            } catch (e) {
                console.error('Error exporting default theme as CSS:', e);
                alert('Error exporting default theme: ' + e.message);
            }
        },
        
        exportCurrentChangesAsCSS() {
            try {
                const currentTheme = this.themes[this.currentTheme] || this.themes['Default Theme'];
                const classic = document.getElementById('theme-classic')?.checked || false;
                const aesthetic = document.getElementById('theme-aesthetic')?.checked || false;
                const corpo = document.getElementById('theme-corpo')?.checked || false;
                
                let cssText = `/*\nTheme: ${document.getElementById('preset-name')?.value || 'Custom'}\n`;
                cssText += `Creator: ${document.getElementById('preset-creator')?.value || 'Anonymous'}\n`;
                cssText += `Description: ${document.getElementById('preset-description')?.value || 'No description'}\n`;
                cssText += `Compatibility: ${classic ? 'Classic' : ''}${aesthetic ? (classic ? ', Aesthetic' : 'Aesthetic') : ''}${corpo ? ((classic || aesthetic) ? ', Corpo' : 'Corpo') : ''}\n`;
                cssText += `Date: ${new Date().toISOString()}\n*/\n\n`;
                cssText += UIManager.dynamicStyleElement.textContent;

                let bgCss = '';
                Object.entries(State.backgrounds.elements).forEach(([selector, imageData]) => {
                    if (imageData) {
                        bgCss += `${selector} {\n`;
                        bgCss += `  background-image: url('${imageData}');\n`;
                        bgCss += `  background-size: cover;\n`;
                        bgCss += `  background-position: center;\n`;
                        
                        const filters = State.backgrounds.filters[selector] || {};
                        Object.entries(filters).forEach(([filter, value]) => {
                            const config = CONFIG.BACKGROUND_FILTERS[filter];
                            if (value !== config.default) {
                                bgCss += `  ${filter}: ${value}${config.unit};\n`;
                            }
                        });
                        
                        bgCss += '}\n\n';
                    }
                });

                if (bgCss) {
                    cssText += '\n/* Background Styles */\n' + bgCss;
                }

                const blob = new Blob([cssText], { type: 'text/css' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'blacklite-custom-theme.css';
                link.click();
                URL.revokeObjectURL(link.href);
            } catch (error) {
                console.error('Error exporting CSS:', error);
            }
        },
        
        convertThemeToCSS(themeData) {
            try {
                let css = `/* Theme: ${themeData.metadata.name} */\n`;
                css += `/* Creator: ${themeData.metadata.creator} */\n`;
                css += `/* Description: ${themeData.metadata.description} */\n`;
                css += `/* Compatibility: ${themeData.metadata.classic ? 'Classic' : ''}${themeData.metadata.aesthetic ? (themeData.metadata.classic ? ', Aesthetic' : 'Aesthetic') : ''}${themeData.metadata.corpo ? ((themeData.metadata.classic || themeData.metadata.aesthetic) ? ', Corpo' : 'Corpo') : ''} */\n`;
                css += `/* Date: ${themeData.metadata.date} */\n\n`;
                css += themeData.css;
                
                if (themeData.backgrounds && themeData.backgrounds.elements) {
                    css += '\n/* Background Styles */\n';
                    Object.entries(themeData.backgrounds.elements).forEach(([selector, imageData]) => {
                        if (imageData) {
                            css += `${selector} {\n`;
                            css += `  background-image: url('${imageData}');\n`;
                            css += `  background-size: cover;\n`;
                            css += `  background-position: center;\n`;
                            
                            const filters = themeData.backgrounds.filters[selector] || {};
                            Object.entries(filters).forEach(([filter, value]) => {
                                const config = CONFIG.BACKGROUND_FILTERS[filter];
                                if (value !== config.default) {
                                    css += `  ${filter}: ${value}${config.unit};\n`;
                                }
                            });
                            
                            css += '}\n\n';
                        }
                    });
                }

                return css;
            } catch (e) {
                console.error('Error converting theme to CSS:', e);
                return `/* Error converting theme to CSS: ${e.message} */`;
            }
        },
        
        getDefaultThemeData() {
            return {
                metadata: {
                    name: 'Default Theme',
                    description: 'This is the KoboldAI Lite default theme.',
                    creator: 'KoboldAI',
                    date: new Date().toISOString(),
                    classic: true,
                    aesthetic: true,
                    corpo: true
                },
                css: BLTOOLSLitedefaultThemeCSS,
                backgrounds: {
                    elements: {},
                    filters: {}
                }
            };
        },
        
        updateThemeInfo(themeName) {
            try {
                const nameInput = document.getElementById('preset-name');
                const creatorInput = document.getElementById('preset-creator');
                const descriptionInput = document.getElementById('preset-description');
                const classicCheckbox = document.getElementById('theme-classic');
                const aestheticCheckbox = document.getElementById('theme-aesthetic');
                const corpoCheckbox = document.getElementById('theme-corpo');

                if (themeName === 'unsaved') {
                    if (nameInput) nameInput.value = 'unsaved changes';
                    if (creatorInput) creatorInput.value = '';
                    if (descriptionInput) descriptionInput.value = '';
                    if (classicCheckbox) classicCheckbox.checked = false;
                    if (aestheticCheckbox) aestheticCheckbox.checked = false;
                    if (corpoCheckbox) corpoCheckbox.checked = false;
                    return;
                }

                const theme = this.themes[themeName];
                if (theme && theme.metadata) {
                    if (nameInput) nameInput.value = theme.metadata.name || '';
                    if (creatorInput) creatorInput.value = theme.metadata.creator || '';
                    if (descriptionInput) descriptionInput.value = theme.metadata.description || '';
                    if (classicCheckbox) classicCheckbox.checked = theme.metadata.classic || false;
                    if (aestheticCheckbox) aestheticCheckbox.checked = theme.metadata.aesthetic || false;
                    if (corpoCheckbox) corpoCheckbox.checked = theme.metadata.corpo || false;
                }
            } catch (e) {
                console.error('Error updating theme info:', e);
            }
        },
        
        markAsUnsaved() {
            if (this.currentTheme !== 'unsaved') {
                this.unsavedChanges = true;
                UIManager.render();
            }
        }
    };

    window.initBlackliteTools = function () {
        console.log('Initializing Blacklite Tools');
        try {
            // 1. Create container and setup styles
            UIManager.createToolContainer();
            UIManager.setupBaseStyles();
            
            // 2. Initialize managers
            ThemeManager.init();
            BackgroundManager.init();
            PresetManager.init();
            
            // 3. Initial render with slight delay to ensure DOM is ready
            setTimeout(() => {
                UIManager.render();
                console.log('Initial render complete');
            }, 50);
            
            window.blackliteToolsInitialized = true;
        } catch (error) {
            console.error('Error initializing Blacklite Tools:', error);
        }
    };

    window.cleanupBlackliteTools = function() {
        console.log('Cleaning up Blacklite Tools');
        try {
            ThemeManager.cleanup();
            BackgroundManager.cleanup();
            InspectorManager.cleanup();
            UIManager.cleanup();
            
            document.querySelectorAll('style[id^="bltool"]').forEach(el => {
                if (el.id !== 'bltool-default-styles' && el.id !== 'bltool-tool-styles') {
                    el.remove();
                }
            });
            
            window.blackliteToolsInitialized = false;
        } catch (error) {
            console.error('Error during cleanup:', error);
        }
    };

    window.initBlackliteTools();

    window.addEventListener('beforeunload', () => {
        window.cleanupBlackliteTools();
    });
})();