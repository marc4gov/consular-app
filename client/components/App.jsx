//app.jsx
injectTapEventPlugin();

var {
    AppCanvas,
    AppBar,
    Styles,
    RaisedButton,
    Card,
    CardHeader,
    CardActions,
    CardMedia,
    CardTitle,
    CardText,
    FlatButton,
    IconButton,
    IconMenu,
    MoreVertIcon,
    MenuItem,
    SvgIcons,
    DatePicker
} = MUI;

var { ThemeManager, LightRawTheme } = Styles;

App = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    
    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
        };
    },
    
    render: function () {
        //let VIcon = <SvgIcons.MoreVertIcon />

        return (
            <AppCanvas>
            <Card>
            <CardHeader
            title="URL Avatar"
            subtitle="Subtitle"
            avatar="http://lorempixel.com/100/100/nature/"

            />
            <CardActions>
            <FlatButton label="Action1" />
            <FlatButton label="Action2" />
            </CardActions>

            <CardMedia
            overlay={<CardTitle title="Consular Affairs" subtitle="Submit your application online" />}
            >
            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQTERUTEhQWFhQXGSEbFxcYGBwbIRwfGB4eGBwfGRocHyggHCElHBcaITEhJSkrLi8uFx80ODMsNygtLisBCgoKDg0OGhAQGjQlHyQsLCwsLTAsLCw0NiwsLCwsNCw0LDQsLCw3LCwsLCw3NCwsMiwsLCwsLCwsLywsLCwsLP/AABEIAHsAoAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQIDBgcBAP/EADkQAAIBAgQEBAQFAwQCAwAAAAECEQMhAAQSMQUiQVEGE2FxMkKBkRQjUqGxwdHwM2Lh8RVTByRD/8QAGgEAAgMBAQAAAAAAAAAAAAAAAQIAAwQFBv/EAC4RAAICAQIGAAQFBQAAAAAAAAABAhEhAzEEEkFRYfAycaHRIpGxweETFEJSgf/aAAwDAQACEQMRAD8AZjjVNBpzTUaNVlRjTD8zH9J7AfTrhgGIBOkFSAzOD8R2VVI27/UY5vm0UauImglbLZkA1FPM1FlsT6iTJ2xoPAvDa1HzGZwMq4IyoJ1QrHVrB6WIsevtjWpkizXmpqVldSacCSd5NogG5HcYUDKtQuOemD0G025uogdRg5KQJXTqJhip+WR8x9htia140kF3croToCd9R7gC98Z+I4fS1lct+63/AJNUJyWHkX5F0UFmOpDsrnmMdFfviuszloAeijTpcrqhuur36YZnhtKpp6kkwyWmNyw2E974qq+H6hBahW19Aj8otflYWm+5GONPgtTSX+y7r7eovcl0KqFOnp0s3lot3+WSRG2+/wDOJLXal5dby2D7ABiQw269cKvx1Rj5bF0q05GllH5g+ZSCQZHQ9d8MuG8U000at+bT/SF/MURu9M3Im0gT6YpSUtzN/dQvwabjWcZaSmhcDmqEXsf+cJOJ8XFQgxp0iC0xdtjiNHxJTOWrtQBqEyIUG3QD+uEDapWnrUtpn8xDFRQPT5sSUm3nfr89/osCT4qEMLI7yNVVOzajGuTIPYjFeb4lS8wIdSxdTFiOw9cDCKatoIWOVNlE/ELm57YlwngFXMqINSkjGec6iD/s9DizS1JdN2Uams9R0lkOylVHU1FO5hP+cGojUwApOprk4R+JuC5gVUaopFOnZatHcDoXT+2CaOeIYKzq8jlqKbEjv2xNTUnVP3t92Kp06ao1OS4raHkAde+GbBHEbyMZo5eCqk2An3OLKWYZNTg+g9IxXzcqrf2vqaI6mS3P+Hxukg9sKKwZLMIjGmy/EtUBiAe+DM1kkqLfFMuHjPMMM6OlxzSSnlGLrNOIaDIvhpn+EMolLjthW1ToRBxlfPB/iOhDk1FcBFn/AALlqrMyvVp62bzfJMCLEB0O5M9CLnGgyuU/D01RAGRbSnyIBChveett8Wk2iJAJuoG5tcbET/hx6SQWIOklhOm5YkTDen9sewOCoVsUCsp0qGUsQBCmFHoP79hjP8R8StSzKUBQqVqrDUy02AGg7AEi/c/TD7PUJpVfLC0qhUEVAJDNEAMvab2tjnGdphB5eeqtQztEsaOZWSH1Q12A5vmHe+BdknOvhN/4d49SriEfyHDaXpVLOvsOvadsO1q3uRTvcx09RtJxyzh/EaaIvFswheuW8unTgQ7KI1J1giN9rxh63HuIU0Nevk6b0rM4BbXzc0wd4HTa2B5QqmavjXC/PU1ARTqEaRU+JfTV6ibHcTjK8YyctTXNh0dTpp1VPORcTq2YCJvBvjUcH4pSzKtUy7itcFvcAHSR0ieuGD1QQV06jHMu6km5F+3pjNrcPCbvZ91+6F1dGOpnqZSoWqhFTS2m6OW8tnYAg6125rXvH1x9Qp1qdHzFp1V1MOV31hGEg6dIkiJMe2NHmfDuVZhqRlImCrMBeCQvQ7CfYYQ8W4I+VqCqrGrRbkIA0nm/9l97gBhGMGrw+ppq5ZXdGTU0Jw/E8rwPuGcGpeYrHQ5VR0sseh6+pw8z+bd8q/4Ly2dZCkmQI9uuOd5eglPVL1VorfzNWsAAgFK3WxPWffAdHMVWrk0T5JYf61AGpRfSD/qJ8pPfC45cP3ewR1lFVR03hS1Rk1/EMfNNMlwe8EnHMcnSWpIIpxbWsEMpOzDuMdETiZfLsywR5R1EdyvTGNyFNlor5jMSwEFoB0ttMCTzCBhJpUl7uTWd8tDFuKtTppCFmAttJXrA9MSy3GQxYuClMCdTbX74QV6iuwY+Xc8s6lZG2Ib0JxfxVzl6YoavLd7urjVTeegbocL1K/6r3NTTr60V1YEE2IwdQz5Q9SO2MVlqX4aiNIalUe/lsdSmOqEYdcPz61l1qykbEDocCSaZo09S/mbHJZvzCQBEb4p4hwlX9D3xDI5YooGxOCjV+wxfy2qkdCEpRppnNaHiEq60s5TbLO1qbXKPFpRz3mIOG/EM6iIaruKSRysY2n2v7Y8yfFqNf8sm5voqL0U2Kz8In+mFYoNmOIMHjTlkU00baXmTHWwtjtdO5UpUMsjxSlUZhTJD6Rp1ggwDdgrASD3AwTT0kqQuvlbTqGpDtdgREWGEedq+dxCkquCaOo1XHyqwCqh9TckdI2ODavGCKho06TV6iACoKcBU1bJLESSOg7dMTA6ae4F4w4AuYp0moE061JgaKgHy3IiRIuswPS3vitPFqiKecoV6dSpyBWVmTqrMpTffph9w7OCqodW08xDCLjTYgz8J2t6+uLxVKrEhEtysCVA2O/WOo74FdReTqjmHio0MucvkcrVaiNWurVk8hafjK/HbcWjSMaEeMTlatGhWIzKNTlcxlxe5ME0xM2A69NjixfB34erUrZEoJQqcvmJIIJ+SpuoIBsfvhJ4MSnk6+YrZwDKVTIFEqRCEah5M2YnYEHp64BTlM6Jw3OpVSaNTUsFdMgsGHxax0IIH3wfTqKywbIeUK9w0C5JOOHcJzQfNeaPOy1bMVB+Hako0BSd3W2sDlB+pxt+BeMX8ipVz1OEpVPLFdQTJkyNEWEiScT5DrUG2Z8POgL5M/Ep00m5ftuGXrBvffCvLVly/m+Wv4atUIQ7lWmd6JPWDcG2Njk82HTXTqLWQ31C4Ci4v0J/zbF7hXGhtFTflaDA6AHqT/fGTU4WMsxx+jKZ6EW7ToxuXVgNNOvQpUHWD0hj2BgEH6HBGZIAKBXKj4lpuilUMaWUG5Cn+cPc94Xy1dPyx5dQA6YuAWWOZDa4tI2xj6qlGFN0UVqYhKriAR+kMDddgGNrxGMWppT0/i/PoY9XTlD4g/LNoY1ar3QQprgBas/CC3RrXwv4fRatXKtNLUSz0avPTYdTTfpizi+aVAmXRghjmo1gDSqFoMpU+WNsHeUuXy/kwUqVBNTL1ucBRv5TDvv1wqSWRfH5lHFMwYOlKqIDpCiH8s7Aj/acaTwdw4jmbcDmGkCT3xk+H0/Mqrp8tlA5HR25hsQ47rbHSOG0/KpKLy3/WBCDeX7eyNPDQuXMw1zuTudsV1lJGn74U+MuK+Rl2KiarHRSH+9tows4TxGtTQJVZqlSF8waYZdVgexGNCjjBvc0nTFzZTLZrVpPl1DAaLT1I9exjFGa4RpAesWNSdCaajIFXsWFyIHXrhi3CaYqpUKwE+DsZ6gdL4oXiVdWAKGpqtAgAXsVPYC98dZJZb38EUV1J5WplqFHQqQrfmOkEudpM7mJuffCHPZz8P51XK1aLq+l2pMTrLRphNNzMC0fzjQcS4fSr1GCvFS2oT2uonoJ6DAFWpUoMj1qa1GJABCgGTcsGHwqNgDvGA1QJRf8Awl4aoVloM1ddNR2atUgEXayr9AB9hhuFAD8pABDFjeewXsceZXP0qsEEuL8pJUmLA33E4mKIUqSxYA/CAbkiwj0xOljrCJM+ovyzyktqFuboCdvhxDiWRp10NLMItVTB0tYKY+RplfpHTEEcAjUx5baIsWsQT7f3xajQw1MJvyxuew7dd8RojSeDG5/wlm6KKMjVFSAClGsFNSib/wClUIAbeIMe2A/E3FXzlWhw1S3mlh+KYr5ZlYkBTYiL+sDHQUIAVTAIsRNySf1H3/nA+dyNKr5ZrUlqCm8h2MOGFwFcQSB29MK0UvT7HNaPHHy+RShRrMuYo5pqSooDeZzCC4PQDaDucbDLeLaVMCln3oUqzHn8piwlbRUMcvaPf6DjwXGfq52k3mBVlVYQ4qkQCRs0b2+2EfgqtTpZatWqUTVzQcismnVUAckksjbLYmBuZwE7Kso6Zks4rp5iFXpWIZGnUxsBIvbeD3GPczkErrziywKbD4wT0AFmuBPS2OdeG6anMvXyOZp06Pla3oG0Ppgl02QSLkdhhn4e/wDkKlWCtmKbZdyCEqMT5THaQ5AiDgNWq6Bu1TCc5wCtQpFQgzVIAkIVkz6gmVmT8NvTAOYz3xq9WrSaRoBGrQTyjQDB02uCMboZiCpuxI0owuLdZ2Ijv6YtYq5CsBUVpF1mANyew2vjHPhV/i68Gd8PF7OhL4Noq9GrVVgwDQ3IEGqLkD6eu+NgVXWp6BbDCHLVKdGmVpqEEbKRpa8mD3w4NTUCReVBHtiinB59wzZowqNCniHAFq1qeYLvqpEkUzdbiCQO/r64dCmA4eBMRPbHyP8AmT8oWf8APrjwLCb3Jt/WMMre3vT6lhkqdUhrDpsdrYnQcECORj8u6x74HLxOo/TEYkCTHcf0x1/KGRRnOFEXH5dTVqXqCf1T98R/8pUpuKdVS9NpMnoBbf5ie2DlqFVI6E3DdvSdsXLTR5A3iSH2HtiZWxKa2AWyFKqrNl6gVmhbn4QP09owxDNJg6IICkjt1wFR4cqVEIkBQQqR9zOCaTAEiZZu94A3jAxWwFVBLVNyQJEwxG/qfriFSk6gsmlx+o9zcnviCQ0iSxZYAOw7nE9csAl5FlHoOmFrsLZ8iQYTSSpBE+gv+5xGqbHTzGTcncmxI+8fTFgVWCalKkCFC9pglsVVcvyglSEA0W+8jAvFE5i9pJa+qDy9II3M9Yn+MJONeGsvmqjVamrziBpei2ipO0sTII2scNywYCxCmVA7R1H16+mICqAFsRqTSB85F5JPT698RsVpMwPiLwxWyeXdMigrUqwAqVlvWiZcMm5BtsLYX8NpIVaj+PX8I6+VRR+YrUYTz0iJW839cdRyrGQ4IQkMNc6dAje/0vhZmfD+Vzb0q4pjUGtXpwJCkiXQiGEjeJJwtsplGnuZHj+frcGXLUKFQGAzOpghwCOZjus3AHQY2lbxHl1qLTeqKDVFVkBHKVNoDmxMb++MzlfCWZOcqPmNGZo1qbU1zCmAgAtqT5Zj9jjO+Ecg2frpSrgeTkqelwbgmYHoJj9sTDEOuu4JGuFSZ6XXYW2Mx/k4qy1VkB6KCeWZENcCd139rYooUFpqKSU9KhSdJ+EARAB+m3vi8nm1QC1mN7TEgL3Fv3xW0mqaBzNPA1oZoGFIgwRHttB6++CqQuh3WNvbCHMVJBkS5Ab01HpHoOowTTrNTMDmgi3S+8N7d8ZpaDTuJdHX6MUVKcTbVfHjJeQJO8euB8rxUOtxpO0YPFJdtsdTyaVnIOynqJMSQcWMJPc9QMeukAC8d8V0lsdM2NzgEvsEpXdYVoKxdTv7A498rUB5ZCjqpN49MDlhsJMbnHq01PcwZk4WgHubzWhGLDQo3mx09cIfCtWoK1d6jaKbAOA3yK07e4GD+N5Z6xF9aAy6G0gdJ6YF8RZCgG/EVHMaP9AGJjYHvgfMqkwrIcfo16nlUW+EC5B2PWTbp++HNJiJhmMtuTaAL/fGPbJsuXCEDz8yZINtK9Y6wBhoKYoZU6ZiJhiTtaO4n+uII2Nmy6uWGti9iL2UE3mMSRdM3BYkRH6R1nrvgejxAMg8xTSLgRTaAbQQJ9cHUar2I0gMpnvA2thOoXJ9wbM8QSkR5ul1YFhPaVhQOvUknYLjzh2QpMy16D8hCsUAuQNbDrIUlmJBFyB7YMSkGAUKgU2YNsBv9LdMLavBiJekDTclmg7EsAAQewAaF2k4N+BGw+oRJ5isQToGw2gj9r98UNkqIqVKhTyXYhnamOVgv61vBIG+Lsvr8sGosOUmqwFwZssDe1px7qJMRFiWY+ne/wD1hWIyvMnRzVZCGW0i6tqnTJi0fT4sfO8MutjMmV7kiQARtuft6YtpSsNMFh+YSLExYQfS+IxJDBgKlyTvT1bAdxBEH0wj8iEQQAqkxFtMySSRFzubx98fQQAFlVEiDMsepE7wNsVwyBZCkiDe6kmSxB+sziVR/iCkMZgEm99z7XAj0wG0xGwL8NTqAVI0k4FcV0qWAIJ/bHvEqTGIMRti9Mw1GmDU5icb7TOlaCkzCzokSOnTFrUZki3p3xh87xSrWr//AFkBQfGes9hhvlPEBEioCvQgj+MI9wc3ceOsHm2jEZJ7af5OLMnmkqREG2xOLGy4sRuOmEbJZTScxeACL98QzGSWqAHVSvc7jFlb/cLzj1k03N4vAwAMCz9Jg9KrBc0wQe+k9vtgCiauYqgBGFKm2p9W56gR74dsRPNPtiOZpCTJIDb6d/TAvoVSXYV8dRazrlwSSx11CLEKuwnpJw2ylIUl+Iki5LX0gdB6YU5fJ1KLVHH5quAWn4gBsBG+DuEirVpu1VIRyRtBCjoffEFsryXF8vVIBYltdp5ZA7T8WGrEGUYyBzEA7R/FuuM0+UTM5laYpg0aAJY7cxFh9Bg7gmXPlvTrPoZ2BRTchV21E7g9sDwLY5rUUJLSQPiKA9B6jFRIDTUDD59MHY2E/f8AfC6vVr5UHSpqpNutjsABtcn9sM8nxRHsWWZg6+pHRD1icI96FbBeJV3p6StN6hkEqCF321TsJ+tsVJxFAfLqL5NUEt5Rg6pPxAiZHT3IsMUUeL5h6jU6VFfNUnUtZtB7CFiWHaMfZThtfz1rVqtNnVWAWmmkA1D8xJJJlcRiMbFioKwAoadJ5g5YW9YGKmpLGlRoVbBWMhi5k6W627/fCzj3iOlltX/6VQuoohBkkXNvhEDr6xg3hlcVUWoswyAgMbAne24Ij9sK4qsCsjSqbzcYT+LOKClThLs1gMOIxj+JoGz1MNcCYGNT2N7GXh/gz0aKxIY3Prg6oQw0Vqe/zf8AOH+nlHtgCsgIM4iFvFmX/wDCVaLa6Lmov6Sbj2ww4Z4kbUUqKUI2DWxblbOYwVxjLIQCVExv9sBZ2In1Qz8+Ztbvj1kj4TNsZfw5mWNRlLEjscaFzDAdMIyWTL2H6u+PkUxvJ6nBHljStuuI6QAY74CEkV/WT1xGvlw6gMx6zpMfeMWOgANuuPaSAKPVr4NC2KuDcN8jUrVCVJkN1k9D3ww4pw4NLHc9QbW2nF1amADA64nlWgn1wKA0KlztbLszVeakBIgTPoOwt1wZlEy9WqjryugJCbCXg/f2wfm0AYeu/wD1hLxDLqKtMAQCbxI3OFeFZW8EKlCs1VadakHRmnWSZWN9DCCNxA9MMaFKiKTZdS0AwSWOsmNg5u2+JcCzDMpDEkCwn3OAauURc2sD5Hbcm/e/XEapX3FeDK5vLFSvDqa+YurzK7qNNQqvSqDvJgSPW2NTxHiVGgUFT8tQYT9JJNwSRAMDri7gAFbTUqgM6qCrECRqEm4udsFZuktU01qAOrapBEgxESPqcB4oV7n/2Q==" />
            </CardMedia>
            </Card>
            <AppBar title="Hallo"/>
            
            <div style={{padding: '80px',}}>
            <RaisedButton primary={true} label="Tap"/>
            <br/>
            <DatePicker hintText="Portrait Dialog"/>
            <br/>
            <DatePicker
            hintText="Landscape Dialog"
            mode="landscape"/>
            </div>
            </AppCanvas>
            );
}
});