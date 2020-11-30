<template>
    <div class="todos">
        <Nav v-if="showIfUserLogged">
            <template v-slot:actual-page__slot>
                <p class="actual-page__slot">Zadania</p>
            </template>
        </Nav>

        <div class="content">
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
                addStatus: null,
            },
        };
    },

    validations: {
        todo: {
            title: {
                required,
                minLength: minLength(4),
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
                this.todo.addStatus = 'ERROR';
            } else {
                firebase.usersCollection
                    .doc(firebase.auth.currentUser.uid)
                    .collection('todos')
                    .add({
                        title: this.todo.title,
                        createdAt: new Date(),
                        isCompleted: false,
                    });

                this.todo.addStatus = 'PENDING';

                setTimeout(() => {
                    this.todo.addStatus = 'OK';
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
.content {
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
}
</style>
