
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
		<input v-model="todo.title" 
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
		},

		editTodo:function(todo, index){
			this.todo = todo;
			this.editIndex = index;
		},

		addTodo:function(){
			if(this.editIndex >-1){
				
			}else{
				this.$root.bus.$emit('create-done', this.todo);

			}
			this.editIndex = -1;
			this.todo = {
				title:'',
				state:'new'
			}
		}
	}

});

Vue.component('todo-editor', TodoEditor);
