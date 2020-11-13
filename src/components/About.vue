<template>
    <div class="about">
        <div class="content">
            <div class="content__header">
                <h2 class="content__title">
                    O mnie 🐝
                </h2>
                <span class="content__close" @click="$emit('close')">
                    <i class="fas fa-times"></i>
                </span>
            </div>
            <div class="content__inside">
                <p class="content__description">
                    Aplikacja internetowa stworzona na potrzeby pracy
                    inżynierskiej pod nadzorem
                    <span class="promotor">dr inż. Luizy Fabisiak</span>.
                </p>
                <p class="content__description">
                    W razie problemów proszę pisać na
                    <a class="email" href="mailto:amiansierocki@outlook.com"
                        >damiansierocki@outlook.com</a
                    >
                </p>
                <p class="content__footer">
                    © 2020 beeapp, version 0.1.0 by Damian Sierocki
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
// about 480px
.about {
    position: absolute;
    display: flex;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;

    background: rgba(#333, 0.5);

    .content {
        position: relative;
        margin: auto;
        background-color: #fff;
        color: black;
        width: 90%;
        z-index: 1;
        border-radius: 5px;
        box-shadow: 0 0 5px 0 rgba(#333, 0.5);
        padding: 2rem;
        text-align: center;
        user-select: text;

        &__close {
            position: absolute;
            top: 0.8rem;
            right: 1rem;
            padding: 0.4rem;

            transition: all 0.2s;
            &:active {
                transform: scale(1.3);
            }
        }

        &__title {
            font-size: 1.5rem;
        }

        &__description {
            font-size: 1rem;
            margin-top: 1rem;
        }

        .promotor {
            font-weight: bold;
        }

        .email {
            font-weight: bold;
            text-decoration: none;
            color: #2a5db0;
        }

        &__footer {
            margin-top: 2rem;
            font-weight: bold;
            font-size: 0.8rem;
        }
    }
}

@media (min-width: 480px) {
    .about {
        .content {
            width: 70%;
        }
    }
}

@media (min-width: 768px) {
    .about {
        .content {
            width: 50%;
        }
    }
}

@media (min-width: 1024px) {
    .about {
        .content {
            width: 30%;

            .email {
                display: block;
                transition: all 0.2s;
                &:hover {
                    transform: scale(1.3);
                }
            }

            &__close {
                &:hover {
                    cursor: pointer;

                    transition: all 0.2s;
                    &:hover {
                        transform: scale(1.3);
                    }
                }
            }
        }
    }
}
</style>
