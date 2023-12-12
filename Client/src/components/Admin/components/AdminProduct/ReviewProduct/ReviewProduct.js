import React, { useEffect, useRef } from "react";
import "./ReviewProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import {
  BlogProduct,
  getproductById,
} from "../../../../../actions/ProductAction";
import { useHistory, useParams } from "react-router-dom";
import { message } from "antd";

export default function ReviewProduct() {
  const { id } = useParams();
  const dispatch = useDispatch(); 
  const editorRef = useRef(null);
  const history = useHistory();
  const [messageApi, contextHolder] = message.useMessage();

  const detailProduct = useSelector((state) => state.getProductById.product);
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Cập nhật thành công!",
      className: 'custom-class',
      style: {
        float: 'right',
        marginTop: '20px'
      },
    });
  };
  const log =async() => {
    if (editorRef.current) {
      const blogContent = String(editorRef.current.getContent());

      success();
      await dispatch(BlogProduct(id, { blogContent }));
    }
    history.push("/admin/product");
  };

  useEffect(() => {
    dispatch(getproductById(id));
  }, [dispatch, id]);

  return (
    <section id="review">
      {contextHolder}
      <div className="review">
        <span className="review-title">Bài viết đánh giá sản phẩm </span>

        <div className="review-content">
          {detailProduct ? (
            <Editor
              apiKey="cmlltcvw2ydrtenwdgwdwqqrvsje6foe8t5xtyaq6lo2ufki"
              language='vi'
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={detailProduct.blog}
              init={{
                height: 500,
                menubar: "file edit view insert format tools table tc help",
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          ) : (
            ""
          )}
          <button onClick={log}>Thêm bài biết đánh giá</button>
        </div>
      </div>
    </section>
  );
}
