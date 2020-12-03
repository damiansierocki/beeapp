<template>
    <div class="todos">
        <Nav v-if="showIfUserLogged">
            <template v-slot:actual-page__slot>
                <p class="actual-page__slot">Zadania</p>
            </template>
        </Nav>

        <div class="container">
            <form class="form" @submit.prevent>
                <p class="form__header" for="todo">Dodaj zadanie</p>

                <input
                    class="form__input"
                    type="text"
                    id="todo"
                    name="todo"
                    placeholder="Wpisz nazwę nowego zadania..."
                    v-model.trim="todo.title"
                />

                <transition
                    enter-active-class="animate__animated animate__shakeX"
                    mode="out-in"
                    appear
                >
                    <p
                        class="error"
                        v-if="!$v.todo.title.required && $v.todo.title.$dirty"
                    >
                        Nazwa zadania jest wymagana!
                    </p>
                </transition>

                <button
                    class="form__button "
                    type="submit"
                    @click="addTodo()"
                    v-if="!isPending"
                >
                    Dodaj zadanie
                </button>

                <div class="sk-chase" v-if="addTodoStatus === 'PENDING'">
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                </div>

                <table class="container__table" v-if="todos.length">
                    <tr
                        class="container__tr"
                        v-for="todo in todos"
                        :key="todo.id"
                        :class="{ fade: todo.isCompleted }"
                    >
                        <td class="container__td">
                            <div
                                class="container__icon"
                                @click="deleteToDo(todo.id)"
                            >
                                <i class="fas fa-trash"></i>
                            </div>
                        </td>
                        <td class="container__td">{{ todo.title }}</td>
                        <td class="container__td container__th--checkbox">
                            <input
                                class="container__checkbox"
                                type="checkbox"
                                id="isCompleted"
                                :checked="todo.isCompleted"
                                @change="updateTodoItem(todo.id, $event)"
                            />
                        </td>
                    </tr>
                </table>

                <div class="container__table-no-todos" v-if="!todos.length">
                    <tr class="container__tr-no-todos">
                        <td class="container__td-no-todos">
                            Brak zadań 😭😭😭
                        </td>
                    </tr>
                </div>
            </form>
        </div>

        <!-- <div class="content">
            <h1 class="content__title">Zadania</h1>

            <div class="container">
                <input
                    class="container__input"
                    type="text"
                    id="todo"
                    name="todo"
                    placeholder="Wpisz nazwę zadania..."
                    v-model.trim="todo.title"
                />

                <p
                    class="error"
                    style="color: red"
                    v-if="!$v.todo.title.required && $v.todo.title.$dirty"
                >
                    Pole jest wymagane!
                </p>

                <p
                    class="error"
                    style="color: red"
                    v-if="!$v.todo.title.minLength && $v.todo.title.$dirty"
                >
                    Pole musi mieć przynajmniej
                    {{ $v.todo.title.$params.minLength.min }} znaki.
                </p>

                <button class="container__button" @click="addTodo">
                    Dodaj
                </button>

                <p class="typo__p" v-if="todo.addStatus === 'OK'">
                    Thanks for your submission!
                </p>
                <p class="typo__p" v-if="todo.addStatus === 'ERROR'">
                    Please fill the form correctly.
                </p>
                <p class="typo__p" v-if="todo.addStatus === 'PENDING'">
                    Sending...
                </p>

                <table class="container__table" v-if="todos.length">
                    <tr
                        class="container__tr"
                        v-for="todo in todos"
                        :key="todo.id"
                        :class="{ fade: todo.isCompleted }"
                    >
                        <th class="container__th">
                            <span
                                class="container__icon"
                                @click="deleteToDo(todo.id)"
                                ><i class="fas fa-trash"></i
                            ></span>
                        </th>
                        <th class="container__th">
                            {{ todo.title }}
                        </th>
                        <th class="container__th container__th--checkbox">
                            <input
                                class="container__checkbox"
                                type="checkbox"
                                id="isCompleted"
                                :checked="todo.isCompleted"
                                @change="updateTodoItem(todo.id, $event)"
                            />
                        </th>
                    </tr>
                </table>
            </div>
        </div> -->
    </div>
</template>

<script>
import Nav from '@/components/Nav';
import { mapState } from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators';
import * as firebase from '../firebase';

export default {
    data() {
        return {
            todos: [],
            todo: {
                title: '',
            },

            addTodoStatus: null,
            isPending: false,
        };
    },

    validations: {
        todo: {
            title: {
                required,
            },
        },
    },

    components: {
        Nav,
    },

    computed: {
        ...mapState(['userProfile']),

        showIfUserLogged() {
            return Object.keys(this.userProfile).length > 1;
        },
    },

    created() {
        this.getTodos();
    },

    methods: {
        addTodo() {
            this.$v.$touch();

            if (this.$v.$invalid) {
                this.addTodoStatus = 'ERROR';
            } else {
                firebase.usersCollection
                    .doc(firebase.auth.currentUser.uid)
                    .collection('todos')
                    .add({
                        title: this.todo.title,
                        createdAt: new Date(),
                        isCompleted: false,
                    });

                this.addTodoStatus = 'PENDING';

                setTimeout(() => {
                    this.addTodoStatus = 'OK';
                }, 500);
            }

            this.todo.title = '';
        },

        async getTodos() {
            const todosRef = await firebase.usersCollection
                .doc(firebase.auth.currentUser.uid)
                .collection('todos');

            todosRef.onSnapshot(snap => {
                this.todos = [];
                snap.forEach(doc => {
                    const todo = doc.data();
                    todo.id = doc.id;
                    this.todos.push(todo);
                });
            });
        },

        updateTodoItem(docId, e) {
            const isChecked = e.target.checked;

            firebase.usersCollection
                .doc(firebase.auth.currentUser.uid)
                .collection('todos')
                .doc(docId)
                .update({
                    isCompleted: isChecked,
                });
        },

        deleteToDo(docId) {
            firebase.usersCollection
                .doc(firebase.auth.currentUser.uid)
                .collection('todos')
                .doc(docId)
                .delete();
        },
    },
};
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .form {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 0.2rem;
        padding: 3rem;

        &__header {
            font-size: 2rem;
            position: relative;
            padding: 2rem 0rem;

            &::after {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 0.5px;
                background: #000000;
            }
        }

        &__input {
            border: 1px solid #ccc;
            padding: 1rem;
            border-radius: 0.2rem;
            margin-top: 2rem;
            transition: all 0.1s;

            &:focus {
                outline: 2px solid orange;
            }
        }

        &__button {
            margin-top: 2rem;
            padding: 1rem 0;
            cursor: pointer;
            border: 1px solid #ccc;
            border-radius: 0.2rem;
            background-color: #f5f5f5;

            &:hover {
                background-color: #e7e7e7c7;
            }
        }

        .error {
            color: tomato;
            margin-top: 0.5rem;
        }

        // sk-chase
        .sk-chase {
            width: 40px;
            height: 40px;
            position: relative;
            animation: sk-chase 2.5s infinite linear both;
            margin: 0 auto;
            margin-top: 2rem;
        }

        .sk-chase-dot {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            animation: sk-chase-dot 2s infinite ease-in-out both;
        }

        .sk-chase-dot:before {
            content: '';
            display: block;
            width: 25%;
            height: 25%;
            background-color: black;
            border-radius: 100%;
            animation: sk-chase-dot-before 2s infinite ease-in-out both;
        }

        .sk-chase-dot:nth-child(1) {
            animation-delay: -1.1s;
        }
        .sk-chase-dot:nth-child(2) {
            animation-delay: -1s;
        }
        .sk-chase-dot:nth-child(3) {
            animation-delay: -0.9s;
        }
        .sk-chase-dot:nth-child(4) {
            animation-delay: -0.8s;
        }
        .sk-chase-dot:nth-child(5) {
            animation-delay: -0.7s;
        }
        .sk-chase-dot:nth-child(6) {
            animation-delay: -0.6s;
        }
        .sk-chase-dot:nth-child(1):before {
            animation-delay: -1.1s;
        }
        .sk-chase-dot:nth-child(2):before {
            animation-delay: -1s;
        }
        .sk-chase-dot:nth-child(3):before {
            animation-delay: -0.9s;
        }
        .sk-chase-dot:nth-child(4):before {
            animation-delay: -0.8s;
        }
        .sk-chase-dot:nth-child(5):before {
            animation-delay: -0.7s;
        }
        .sk-chase-dot:nth-child(6):before {
            animation-delay: -0.6s;
        }

        @keyframes sk-chase {
            100% {
                transform: rotate(360deg);
            }
        }

        @keyframes sk-chase-dot {
            80%,
            100% {
                transform: rotate(360deg);
            }
        }

        @keyframes sk-chase-dot-before {
            50% {
                transform: scale(0.4);
            }
            100%,
            0% {
                transform: scale(1);
            }
        }
    }

    &__table {
        margin-top: 2rem;
        font-size: 1.5rem;
        text-align: center;
        border: 0.5px solid black;
        border-radius: 0.2rem;
    }

    &__table-no-todos {
        margin-top: 2rem;
        font-size: 1.5rem;
        text-align: center;
    }

    &__tr {
        &:nth-child(even) {
            background: #eee;
        }
    }

    &__tr-no-todos {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__td {
        padding: 1rem;
        font-size: 1.2rem;
    }

    &__td-no-todos {
        padding: 1rem;
        font-size: 1.2rem;
    }

    &__icon,
    &__checkbox {
        cursor: pointer;
    }

    .fade {
        opacity: 0.4 !important;
    }
}

@media (min-width: 480px) {
    .container {
        background-color: white;
        margin-top: 3rem;

        .form {
            border: 1px solid #ccc;
            background: white;
            max-width: 480px;
        }
    }
}
/* .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
    margin: auto;

    &__title {
        font-size: 3rem;
        margin-top: 2rem;
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 90%;

        &__input {
            margin-top: 2rem;
            padding: 1rem;
            border-bottom: 1px solid black;
            width: 100%;
        }

        &__button {
            margin-top: 1rem;
            box-shadow: inset 0px 1px 0px 0px #fff6af;
            background: linear-gradient(to bottom, #ffec64 5%, #ffab23 100%);
            background-color: #ffec64;
            border-radius: 6px;
            border: 1px solid #ffaa22;
            cursor: pointer;
            color: #333333;
            font-weight: bold;
            padding: 6px 24px;
            text-shadow: 0px 1px 0px #ffee66;

            &:focus {
                outline: 0;
            }
        }

        &__table {
            width: 100%;
            padding: 2rem 0rem;
            user-select: none;
            border: 3px solid black;
            margin-top: 1rem;
        }

        &__th {
            font-size: 1.5rem;
            border: 1px solid black;

            &--checkbox {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                padding: 0.3rem;
            }
        }

        &__icon {
            cursor: pointer;
        }

        &__checkbox {
            cursor: pointer;
            width: 20px;
            height: 20px;
        }

        .fade {
            opacity: 0.4 !important;
        }
    }
} */
</style>
