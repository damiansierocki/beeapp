<template>
    <div class="info">
        <div class="container">
            <h3 class="container__title">Informacje</h3>

            <div class="grid">
                <!-- pasieki -->
                <router-link to="/apiaries" class="grid__apiaries">
                    <img
                        class="grid__icon "
                        src="./../assets/images/svgs/apiary.svg"
                        alt="apiary icon"
                    />

                    <p class="grid__number">0</p>

                    <p class="grid__description grid__description--green">
                        Pasieki
                    </p>
                </router-link>

                <!-- ule -->
                <router-link to="/hives" class="grid__hives">
                    <img
                        class="grid__icon "
                        src="./../assets/images/svgs/hives.svg"
                        alt="hives icon"
                    />

                    <p class="grid__number">0</p>

                    <p class="grid__description grid__description--orange">
                        Ule
                    </p>
                </router-link>

                <!-- inspekcje -->
                <router-link to="/inspections" class="grid__inspections">
                    <img
                        class="grid__icon "
                        src="./../assets/images/svgs/inspections.svg"
                        alt="inspections icon"
                    />

                    <p class="grid__number">0</p>

                    <p class="grid__description grid__description--blue">
                        Inspekcje
                    </p>
                </router-link>

                <!-- notatki -->
                <div class="grid__notes">
                    <img
                        class="grid__icon"
                        src="./../assets/images/svgs/notes.svg"
                        alt="notes icon"
                    />

                    <p class="grid__number">{{ notes.length }}</p>

                    <p class="grid__description grid__description--yellow">
                        Notatki
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as firebase from '../firebase';

export default {
    data() {
        return {
            notes: [],
        };
    },

    created() {
        this.getNotes();
    },

    methods: {
        async getNotes() {
            const notesRef = await firebase.usersCollection
                .doc(firebase.auth.currentUser.uid)
                .collection('notes');

            notesRef.onSnapshot(snap => {
                this.notes = [];
                snap.forEach(doc => {
                    const note = doc.data();
                    note.id = doc.id;
                    this.notes.push(note);
                });
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.info {
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 3rem;

        &__title {
            font-size: 2.5rem;
        }

        .grid {
            display: grid;
            grid-template-columns: auto;
            width: 100%;
            height: 100%;
            margin-top: 2rem;

            &__apiaries {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border-bottom: 0.5px solid black;
                padding: 1rem;
                text-decoration: none;

                &:hover {
                    font-weight: bold;
                    text-decoration: underline;
                }
            }

            &__hives {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border-bottom: 0.5px solid black;
                padding: 1rem;
                text-decoration: none;

                &:hover {
                    font-weight: bold;
                    text-decoration: underline;
                }
            }

            &__inspections {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border-bottom: 0.5px solid black;
                padding: 1rem;
                text-decoration: none;

                &:hover {
                    font-weight: bold;
                    text-decoration: underline;
                }
            }

            &__notes {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border-bottom: 0.5px solid black;
                padding: 1rem;
            }

            &__number {
                font-size: 2rem;
            }

            &__description {
                font-size: 1.5rem;
                font-weight: bold;

                &--green {
                    color: green;
                }

                &--yellow {
                    color: yellow;
                }

                &--blue {
                    color: blue;
                }

                &--orange {
                    color: orange;
                }
            }

            &__icon {
                width: 10rem;
                height: 10rem;
                border-radius: 3rem;
            }
        }
    }
}

@media (min-width: 480px) {
    .info {
        .container {
            .grid {
                grid-template-columns: auto auto;

                &__apiaries {
                    border-right: 0.5px solid black;
                }

                &__inspections {
                    border-right: 0.5px solid black;
                }
            }
        }
    }
}

@media (min-width: 768px) {
    .info {
        .container {
            max-width: 768px;
            margin: 0 auto;
            margin-top: 3rem;
        }
    }
}
</style>
