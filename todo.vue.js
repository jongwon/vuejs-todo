var TodoListVue = Vue.extend({

	template:`
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
		<div class="todo-form">
			<input v-model="todo.title" 
			@keyup.enter.stop.prevent="addTodo()">
			<button @click="addTodo()"> 만들기 </button>
		</div>
	</div>
	`,

	data:function(){
		return {
			appname:'jongwon'
		}
	},

	mounted:function(){
		var self = this;
		$.ajax({
			url:self.$root.ctx+'/test.json',
			dataType:'json'
		}).done(function(list){
			console.log(list);
			self.todoList = list;
		})
	},

	methods:{

		deleteTodo:function(index){
			this.todoList.splice(index, 1);
		},

		editTodo:function(index){
			this.todo = this.todoList[index];
			// this.editIndex = index;
		},

		addTodo:function(){
			console.log('addTodo called')

			var index = this.todoList.indexOf(this.todo);
			if(index>-1){

				this.todo = {
					title:'',
					state:'new'
				};

			}else{
				this.todoList.push(this.todo);
				this.todo = {
					title:'',
					state:'new'
				};
			}
		},

		changeState:function(index){
			var todo = this.todoList[index];
			if(todo.state == 'new'){
				todo.state = 'ing';
			}else if(todo.state == 'ing'){
				todo.state = 'end';
			}else if(todo.state == 'end'){
				todo.state = 'new';
			}
		}
	}

});

