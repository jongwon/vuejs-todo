
var TodoEditor = Vue.extend({

	props:{
		editIndex:{
			type:Number,
			default:-1 // -1 : new , else : edit
		},
		todo:{
			type:Object,
			default:function(){
				return {
					title:'',
					state:'new'
				};
			}
		}
	},

	template:`
	<div class="todo-form">
		<input class="todo-title" v-model="todo.title" 
		@keyup.enter.stop.prevent="addTodo()">
		<button @click="addTodo()"> 만들기 </button>
	</div>
	`,

	mounted:function(){
		this.$root.bus.$on('edit-todo', this.editTodo);
	},

	beforeDestroy:function(){
		this.$root.bus.$off('edit-todo', this.editTodo);
	},

	methods:{

		newTodo:function(){
			// ???
			this.editIndex = -1;
			this.todo = {
				title:'',
				state:'new'
			};
		},

		editTodo:function(todo, index){
			this.todo = todo;
			this.editIndex = index;
		},

		addTodo:function(){
			var self = this;
			if(this.editIndex < 0){
				this.$root.bus.$emit('create-done', this.todo);
			}
			this.$nextTick(function(){
				self.newTodo();
			});
			
		}
	}

});

Vue.component('todo-editor', TodoEditor);
