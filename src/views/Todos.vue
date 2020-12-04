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
                        <td class="container__td container__td--no-pointer">
                            {{ todo.title }}
                        </td>
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
            padding: 2rem 0;

            &::after {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 0.5px;
                background: #000;
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
            transition: 0.1s;

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

        .sk-chase-dot::before {
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

        .sk-chase-dot:nth-child(1)::before {
            animation-delay: -1.1s;
        }

        .sk-chase-dot:nth-child(2)::before {
            animation-delay: -1s;
        }

        .sk-chase-dot:nth-child(3)::before {
            animation-delay: -0.9s;
        }

        .sk-chase-dot:nth-child(4)::before {
            animation-delay: -0.8s;
        }

        .sk-chase-dot:nth-child(5)::before {
            animation-delay: -0.7s;
        }

        .sk-chase-dot:nth-child(6)::before {
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
        transition: 0.1s;

        &:hover {
            transform: scale(1.1);
        }

        &--no-pointer {
            cursor: auto;

            &:hover {
                transform: scale(1);
            }
        }
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
        transition: 0.2s;
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
</style>
