/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	
	var TodoEditor = Vue.extend({

		props: {
			editIndex: {
				type: Number,
				default: -1 // -1 : new , else : edit
			},
			todo: {
				type: Object,
				default: function () {
					return {
						title: '',
						state: 'new'
					};
				}
			}
		},

		template: `
		<div class="todo-form">
			<input class="todo-title" v-model="todo.title" 
			@keyup.enter.stop.prevent="addTodo()">
			<button @click="addTodo()"> 만들기 </button>
		</div>
		`,

		mounted: function () {
			this.$root.bus.$on('edit-todo', this.editTodo);
		},

		beforeDestroy: function () {
			this.$root.bus.$off('edit-todo', this.editTodo);
		},

		methods: {

			newTodo: function () {
				// ???
				this.editIndex = -1;
				this.todo = {
					title: '',
					state: 'new'
				};
			},

			editTodo: function (todo, index) {
				this.todo = todo;
				this.editIndex = index;
			},

			addTodo: function () {
				var self = this;
				if (this.editIndex < 0) {
					this.$root.bus.$emit('create-done', this.todo);
				}
				this.$nextTick(function () {
					self.newTodo();
				});
			}
		}

	});

	Vue.component('todo-editor', TodoEditor);

/***/ },
/* 2 */
/***/ function(module, exports) {

	var TodoList = Vue.extend({

		props: {
			todoList: {
				type: Array,
				default: function () {
					return [];
				}
			}
		},

		template: `
		<div>
			<div class="todo-list"> 
				<ol>
					<li class="todo"
						v-for="(todo, index) in todoList"
						@click="changeState(index)"
						:class="todo.state"
					>
					 <button @click.stop.prevent="deleteTodo(index)">삭제</button> 
					 {{todo.title}} 
					 <button @click.stop.prevent="editTodo(index)">수정</button> 
					</li>
				</ol>
			</div>
		</div>
		`,

		data: function () {
			return {};
		},

		mounted: function () {

			var self = this;
			this.$root.bus.$on('create-done', this.addTodo);
			this.$root.bus.$on('add-todo-list', this.addTodoList);

			$.ajax({
				url: self.$root.ctx + '/test.json',
				dataType: 'json'
			}).done(function (list) {
				console.log(list);
				self.$root.bus.$emit('add-todo-list', list);
				// Vue.set(self, 'todoList', list);
				// self.todoList = list;
			});
		},

		beforeDestroy: function () {
			this.$root.bus.$off('create-done', this.addTodo);
			this.$root.bus.$off('add-todo-list', this.addTodoList);
		},

		methods: {

			deleteTodo: function (index) {
				this.todoList.splice(index, 1);
			},

			editTodo: function (index) {
				this.$root.bus.$emit('edit-todo', this.todoList[index], index);
			},

			addTodo: function (todo) {
				console.log('addTodo called');
				this.todoList.push(todo);
			},

			addTodoList: function (arr) {
				var self = this;
				arr.forEach(function (a) {
					self.todoList.push(a);
				});
			},

			changeState: function (index) {
				var todo = this.todoList[index];
				if (todo.state == 'new') {
					todo.state = 'ing';
				} else if (todo.state == 'ing') {
					todo.state = 'end';
				} else if (todo.state == 'end') {
					todo.state = 'new';
				}
			}
		}

	});

	Vue.component('todo-list', TodoList);

/***/ }
/******/ ]);