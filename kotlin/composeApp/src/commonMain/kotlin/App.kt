import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.IntrinsicSize
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.Button
import androidx.compose.material.Checkbox
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.material.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.ui.tooling.preview.Preview

@Composable
@Preview
fun App() {
    var lastId by remember { mutableStateOf(0) }
    var todoItems by remember { mutableStateOf(listOf<Todo>()) }
    var text by remember { mutableStateOf("") }

    MaterialTheme {
        Column {
            Row(
                modifier = Modifier.fillMaxWidth()
                    .padding(8.dp)
            ) {
                TextField(
                    value = text,
                    onValueChange = { text = it },
                    modifier = Modifier.weight(1f)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Button(
                    onClick = {
                        todoItems += Todo(lastId++, text)
                        text = ""
                    },
                    modifier = Modifier.height(IntrinsicSize.Min)
                ) {
                    Text("Add")
                }
            }


            Column(
                modifier = Modifier.fillMaxSize()
                    .verticalScroll(rememberScrollState())
            ) {
                todoItems.forEach { item ->
                    Row(
                        modifier = Modifier.fillMaxWidth()
                            .padding(8.dp)
                            .align(Alignment.CenterHorizontally)
                    ) {
                        Checkbox(
                            checked = item.completed,
                            onCheckedChange = {
                                todoItems = todoItems.map {
                                    if (it.id == item.id) {
                                        it.copy(completed = !it.completed)
                                    } else {
                                        it
                                    }
                                }
                            },
                            modifier = Modifier.align(Alignment.CenterVertically)
                        )
                        Text(item.title)
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                }
            }
        }
    }
}