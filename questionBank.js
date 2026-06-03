// Auto-generated question bank for local ATMMT exam generator.
const QUESTION_BANK = [
  {
    "id": "Q001",
    "type": "mcq",
    "lesson": "Bài 1",
    "topic": "CIA & an toàn dữ liệu",
    "difficulty": 2,
    "question": "Bốn yêu cầu bảo vệ dữ liệu trong bài tổng quan gồm nhóm nào?",
    "options": [
      "Bí mật, toàn vẹn, không thể từ chối, sẵn sàng",
      "Mã hóa, nén, phân mảnh, định tuyến",
      "Xác thực, NAT, proxy, ACL",
      "Sao lưu, cache, log, routing",
      "Định danh, định tuyến, chuyển mạch, mã hóa"
    ],
    "answer": 0,
    "explanation": "Đây là bộ thuộc tính nền: Confidentiality, Integrity, Non-repudiation, Availability.",
    "tags": []
  },
  {
    "id": "Q002",
    "type": "mcq",
    "lesson": "Bài 1",
    "topic": "Eavesdropping",
    "difficulty": 2,
    "question": "Tấn công eavesdropping có bản chất gần nhất với hành vi nào?",
    "options": [
      "Làm tràn bộ đệm để chiếm quyền",
      "Nghe lén/bắt gói tin đi qua thiết bị mạng",
      "Gửi lại một thông điệp xác thực cũ",
      "Dò mật khẩu bằng từ điển",
      "Giả mạo địa chỉ MAC trong LAN"
    ],
    "answer": 1,
    "explanation": "Eavesdropping là nghe trộm lưu lượng bằng thiết bị/công cụ như Wireshark, tcpdump.",
    "tags": []
  },
  {
    "id": "Q003",
    "type": "mcq",
    "lesson": "Bài 1",
    "topic": "Cryptanalysis",
    "difficulty": 2,
    "question": "Cryptanalysis khác brute-force thuần túy ở điểm nào?",
    "options": [
      "Luôn cần biết khóa bí mật",
      "Tìm thông tin hữu ích từ ciphertext bằng cấu trúc/thống kê, không nhất thiết thử hết khóa",
      "Chỉ áp dụng cho mật khẩu hệ điều hành",
      "Chỉ phá được firewall",
      "Luôn là tấn công vật lý"
    ],
    "answer": 1,
    "explanation": "Thám mã khai thác đặc điểm thuật toán/ngôn ngữ; brute-force là vét cạn khóa.",
    "tags": []
  },
  {
    "id": "Q004",
    "type": "mcq",
    "lesson": "Bài 1",
    "topic": "Password attacks",
    "difficulty": 2,
    "question": "Nhóm nào sau đây đều thuộc password pilfering?",
    "options": [
      "Guessing, social engineering, dictionary, password sniffing",
      "ARP spoofing, TCP hijacking, SYN flood, Smurf",
      "DES, AES, RSA, RC4",
      "NAT, DMZ, ACL, TMG",
      "SubBytes, ShiftRows, MixColumns, AddRoundKey"
    ],
    "answer": 0,
    "explanation": "Password pilfering tập trung vào lấy/cướp mật khẩu.",
    "tags": []
  },
  {
    "id": "Q005",
    "type": "mcq",
    "lesson": "Bài 1",
    "topic": "Identity spoofing",
    "difficulty": 2,
    "question": "Phương pháp tấn công cho phép kẻ tấn công mạo nhận nạn nhân mà không cần mật khẩu được gọi là gì?",
    "options": [
      "Eavesdropping",
      "Cryptanalysis",
      "Identity spoofing",
      "Availability attack",
      "Key management"
    ],
    "answer": 2,
    "explanation": "Identity spoofing gồm MITM, replay, network spoofing, software exploitation.",
    "tags": []
  },
  {
    "id": "Q006",
    "type": "mcq",
    "lesson": "Bài 1",
    "topic": "Replay attack",
    "difficulty": 3,
    "question": "Trong replay attack, yếu tố nào thường bị attacker lợi dụng?",
    "options": [
      "Một gói/ticket/giấy phép xác thực cũ nhưng còn được hệ thống chấp nhận",
      "Một mật khẩu đủ dài có ký tự đặc biệt",
      "Một khóa private chưa từng dùng",
      "Một firewall ở chế độ stateful",
      "Một file đã nén bằng ZIP"
    ],
    "answer": 0,
    "explanation": "Replay là chặn và gửi lại dữ liệu xác thực hợp lệ trước đó.",
    "tags": []
  },
  {
    "id": "Q007",
    "type": "mcq",
    "lesson": "Bài 1",
    "topic": "ARP spoofing",
    "difficulty": 3,
    "question": "ARP spoofing nguy hiểm chủ yếu vì lý do nào?",
    "options": [
      "ARP ánh xạ IP sang MAC nên attacker có thể lừa thiết bị gửi frame đến MAC sai",
      "ARP mã hóa toàn bộ payload nên khó kiểm tra",
      "ARP chỉ chạy trên tầng ứng dụng",
      "ARP luôn có chứng chỉ số",
      "ARP thay thế hoàn toàn TCP"
    ],
    "answer": 0,
    "explanation": "ARP poisoning làm sai bảng ánh xạ IP-MAC trong LAN.",
    "tags": []
  },
  {
    "id": "Q008",
    "type": "mcq",
    "lesson": "Bài 1",
    "topic": "DoS/DDoS",
    "difficulty": 2,
    "question": "Điểm khác nhau ngắn gọn giữa DoS và DDoS là gì?",
    "options": [
      "DoS dùng mã hóa, DDoS không dùng mã hóa",
      "DoS từ một nguồn, DDoS từ nhiều nguồn phân tán/botnet",
      "DoS ở tầng ứng dụng, DDoS chỉ ở tầng vật lý",
      "DoS hợp pháp, DDoS bất hợp pháp",
      "Không có khác biệt"
    ],
    "answer": 1,
    "explanation": "DDoS thường điều khiển nhiều máy zombie/botnet cùng tấn công.",
    "tags": []
  },
  {
    "id": "Q009",
    "type": "mcq",
    "lesson": "Bài 1",
    "topic": "Buffer overflow",
    "difficulty": 2,
    "question": "Nguyên nhân trực tiếp của buffer overflow là gì?",
    "options": [
      "Ghi dữ liệu vượt quá kích thước bộ đệm khả dụng",
      "Chọn khóa RSA quá dài",
      "Dùng HTTPS thay vì HTTP",
      "Chặn port 80",
      "Mật khẩu có chữ hoa"
    ],
    "answer": 0,
    "explanation": "Tràn bộ đệm xảy ra khi chương trình không kiểm tra biên bộ nhớ.",
    "tags": []
  },
  {
    "id": "Q010",
    "type": "mcq",
    "lesson": "Bài 1",
    "topic": "Malware taxonomy",
    "difficulty": 2,
    "question": "Worm khác virus ở điểm cốt lõi nào?",
    "options": [
      "Worm cần file chủ, virus không cần file chủ",
      "Worm là chương trình độc lập có thể tự lan truyền, virus thường cần bám vào file/chương trình chủ",
      "Worm chỉ là phần cứng",
      "Worm không thể lây qua mạng",
      "Worm luôn là keylogger"
    ],
    "answer": 1,
    "explanation": "Virus thường ký sinh; worm thường stand-alone và tự phát tán qua mạng.",
    "tags": []
  },
  {
    "id": "Q011",
    "type": "mcq",
    "lesson": "Bài 2a",
    "topic": "Trojan",
    "difficulty": 2,
    "question": "Đặc điểm nào mô tả đúng Trojan?",
    "options": [
      "Tự nhân bản như virus",
      "Ngụy trang/chạy bí mật để phục vụ mục đích attacker, thường không tự nhân bản",
      "Chỉ tồn tại trong boot sector",
      "Là thuật toán mã hóa đối xứng",
      "Là giao thức xác thực hai chiều"
    ],
    "answer": 1,
    "explanation": "Trojan thường dụ người dùng chạy và mở backdoor/đánh cắp thông tin.",
    "tags": []
  },
  {
    "id": "Q012",
    "type": "mcq",
    "lesson": "Bài 2a",
    "topic": "RAT",
    "difficulty": 2,
    "question": "RAT trong nhóm Trojan thường biến máy nạn nhân thành gì?",
    "options": [
      "Một DNS server hợp pháp",
      "Một server cho hacker điều khiển từ xa",
      "Một firewall stateful",
      "Một CA cấp chứng chỉ",
      "Một router chạy OSPF"
    ],
    "answer": 1,
    "explanation": "Remote Access Trojan cho phép attacker điều khiển máy bị nhiễm.",
    "tags": []
  },
  {
    "id": "Q013",
    "type": "mcq",
    "lesson": "Bài 2a",
    "topic": "Keylogger",
    "difficulty": 2,
    "question": "Thành phần nào KHÔNG phải mô tả thường gặp của keylogger?",
    "options": [
      "Ghi lại thao tác bàn phím",
      "Lưu hoặc gửi log về attacker",
      "Có thể capture màn hình",
      "Tạo bảng định tuyến IPsec SA",
      "Có phần điều khiển/hook/log"
    ],
    "answer": 3,
    "explanation": "Keylogger không liên quan đến Security Association của IPsec.",
    "tags": []
  },
  {
    "id": "Q014",
    "type": "mcq",
    "lesson": "Bài 2a",
    "topic": "FTP Trojan",
    "difficulty": 2,
    "question": "FTP Trojan thường mở cổng nào để người khác truy cập/tải dữ liệu?",
    "options": [
      "21",
      "22",
      "25",
      "80",
      "443"
    ],
    "answer": 0,
    "explanation": "FTP mặc định dùng port 21.",
    "tags": []
  },
  {
    "id": "Q015",
    "type": "mcq",
    "lesson": "Bài 2a",
    "topic": "Back Orifice",
    "difficulty": 2,
    "question": "Back Orifice thường được nhắc với cổng xâm nhập nào?",
    "options": [
      "80",
      "31337",
      "443",
      "53",
      "110"
    ],
    "answer": 1,
    "explanation": "Back Orifice gắn với port 31337 trong slide.",
    "tags": []
  },
  {
    "id": "Q016",
    "type": "mcq",
    "lesson": "Bài 2a",
    "topic": "Phòng chống Trojan",
    "difficulty": 2,
    "question": "Bộ công cụ nào phù hợp để kiểm tra dấu hiệu Trojan trên máy?",
    "options": [
      "Netstat/TCPView, Process Viewer, MsConfig, Wireshark",
      "PowerPoint, Excel, Word, Paint",
      "RSA, SHA, AES, DES",
      "DHCP, DNS, RIP, OSPF",
      "NAT, PAT, DMZ, VLAN"
    ],
    "answer": 0,
    "explanation": "Các công cụ này giúp xem port, process, registry/startup và hoạt động mạng.",
    "tags": []
  },
  {
    "id": "Q017",
    "type": "mcq",
    "lesson": "Bài 2a",
    "topic": "Privilege escalation Trojan",
    "difficulty": 3,
    "question": "Trojan leo thang đặc quyền nguy hiểm vì gì?",
    "options": [
      "Luôn xóa file Word",
      "Có thể gắn vào ứng dụng hệ thống để chạy với quyền cao hơn quyền ban đầu",
      "Chỉ tạo checksum",
      "Chỉ đổi địa chỉ IP public",
      "Chỉ mã hóa email hợp pháp"
    ],
    "answer": 1,
    "explanation": "Mục tiêu là nâng quyền thực thi của attacker/mã độc.",
    "tags": []
  },
  {
    "id": "Q018",
    "type": "mcq",
    "lesson": "Bài 2b",
    "topic": "Virus lifecycle",
    "difficulty": 2,
    "question": "Trình tự mô tả tốt nhất hoạt động cơ bản của virus là gì?",
    "options": [
      "Tạo khóa công khai → cấp chứng chỉ → thu hồi",
      "Gắn vào đối tượng chủ → được thực thi → lây nhiễm đối tượng khác → phá hoại/do thám → trả quyền cho chương trình chủ",
      "Tạo SA → IKE → ESP → AH",
      "NAT → PAT → DMZ → Proxy",
      "Hash → ký → nén → gửi"
    ],
    "answer": 1,
    "explanation": "Virus thường bám vật chủ, lây nhiễm rồi che giấu/hoàn trả điều khiển.",
    "tags": []
  },
  {
    "id": "Q019",
    "type": "mcq",
    "lesson": "Bài 2b",
    "topic": "Macro virus",
    "difficulty": 2,
    "question": "Macro virus thường lây nhiễm nhóm đối tượng nào?",
    "options": [
      "Tài liệu Word/Excel/PowerPoint dùng macro/VBA",
      "Bảng định tuyến router",
      "Chứng chỉ X.509",
      "Bản ghi DNS duy nhất",
      "Khung Ethernet trống"
    ],
    "answer": 0,
    "explanation": "Macro virus khai thác macro trong ứng dụng văn phòng.",
    "tags": []
  },
  {
    "id": "Q020",
    "type": "mcq",
    "lesson": "Bài 2b",
    "topic": "Polymorphic virus",
    "difficulty": 2,
    "question": "Virus đa hình chống nhận diện chữ ký bằng cách nào?",
    "options": [
      "Tạo các bộ giải mã/mẫu mã khác nhau qua mỗi lần lây nhiễm",
      "Mở port 21",
      "Tạo ACL firewall",
      "Tăng TTL gói IP",
      "Đổi IP public bằng NAT"
    ],
    "answer": 0,
    "explanation": "Polymorphic làm thay đổi hình thức mã để tránh signature đơn giản.",
    "tags": []
  },
  {
    "id": "Q021",
    "type": "mcq",
    "lesson": "Bài 2b",
    "topic": "Metamorphic virus",
    "difficulty": 3,
    "question": "Kỹ thuật biến hình khác đa hình ở điểm nào?",
    "options": [
      "Sinh đoạn mã mới hoàn toàn/chuyển đổi cấu trúc mã sâu hơn",
      "Chỉ đổi tên file",
      "Chỉ nén file bằng ZIP",
      "Chỉ thay đổi địa chỉ MAC",
      "Chỉ gửi email có đính kèm"
    ],
    "answer": 0,
    "explanation": "Metamorphic thường tái cấu trúc mã, khó hơn polymorphic.",
    "tags": []
  },
  {
    "id": "Q022",
    "type": "mcq",
    "lesson": "Bài 2b",
    "topic": "Heuristic scanning",
    "difficulty": 2,
    "question": "Heuristic trong chống virus chủ yếu dùng để làm gì?",
    "options": [
      "Phát hiện theo hành vi/mẫu đáng ngờ thay vì chỉ chữ ký đã biết",
      "Tính RSA d",
      "Cấp địa chỉ IP động",
      "Chuyển port private sang public",
      "Nén email bằng MIME"
    ],
    "answer": 0,
    "explanation": "Heuristic giúp phát hiện malware mới hoặc biến thể chưa có signature.",
    "tags": []
  },
  {
    "id": "Q023",
    "type": "mcq",
    "lesson": "Bài 2b",
    "topic": "Dấu hiệu nhiễm virus",
    "difficulty": 1,
    "question": "Dấu hiệu nào hợp lý khi máy nhiễm virus?",
    "options": [
      "Máy chậm bất thường, treo, xuất hiện file lạ, mất dữ liệu",
      "RAM tự tăng dung lượng vật lý",
      "Địa chỉ IP public tự biến thành private",
      "Màn hình luôn sáng hơn",
      "Trình duyệt chỉ dùng HTTPS"
    ],
    "answer": 0,
    "explanation": "Các dấu hiệu trong slide gồm treo/chậm/thiếu file/file lạ/mất dữ liệu.",
    "tags": []
  },
  {
    "id": "Q024",
    "type": "mcq",
    "lesson": "Bài 3",
    "topic": "Khái niệm mật mã",
    "difficulty": 2,
    "question": "Trong ký hiệu c = e(m, ke), ke là gì?",
    "options": [
      "Khóa giải mã",
      "Khóa mã hóa",
      "Chuỗi bản mã",
      "Hàm băm",
      "Chữ ký số"
    ],
    "answer": 1,
    "explanation": "ke là encryption key; kd là decryption key.",
    "tags": []
  },
  {
    "id": "Q025",
    "type": "mcq",
    "lesson": "Bài 3",
    "topic": "Symmetric vs asymmetric",
    "difficulty": 2,
    "question": "Phát biểu nào đúng về mã hóa đối xứng?",
    "options": [
      "Dùng một khóa chung cho mã hóa và giải mã",
      "Luôn dùng hai khóa public/private",
      "Không cần giữ bí mật khóa",
      "Chỉ dùng cho chữ ký số",
      "Không thể dùng trong DES/AES"
    ],
    "answer": 0,
    "explanation": "Đối xứng dùng khóa bí mật chia sẻ, như DES/AES.",
    "tags": []
  },
  {
    "id": "Q026",
    "type": "mcq",
    "lesson": "Bài 3",
    "topic": "Substitution/permutation",
    "difficulty": 2,
    "question": "Mật mã hoán vị thay đổi điều gì so với bản rõ?",
    "options": [
      "Thay đổi ký tự thành ký tự khác nhưng giữ vị trí",
      "Thay đổi vị trí/sắp xếp ký tự, thường giữ nguyên tập ký tự",
      "Thêm chứng chỉ X.509",
      "Tạo khóa phiên",
      "Tạo checksum TCP"
    ],
    "answer": 1,
    "explanation": "Hoán vị đổi vị trí; thay thế đổi ký hiệu.",
    "tags": []
  },
  {
    "id": "Q027",
    "type": "mcq",
    "lesson": "Bài 3",
    "topic": "Caesar",
    "difficulty": 2,
    "question": "Với Caesar C = (p + k) mod 26, nếu p = A và k = 3 thì C là gì?",
    "options": [
      "A",
      "B",
      "C",
      "D",
      "Z"
    ],
    "answer": 3,
    "explanation": "A=0, 0+3=3 tương ứng D.",
    "tags": []
  },
  {
    "id": "Q028",
    "type": "mcq",
    "lesson": "Bài 3",
    "topic": "Frequency analysis",
    "difficulty": 2,
    "question": "Tại sao mã thay thế đơn bảng dễ bị phân tích tần suất?",
    "options": [
      "Vì mỗi ký tự luôn bị thay bằng cùng một ký tự nên phân bố tần suất còn dấu vết",
      "Vì nó dùng khóa công khai",
      "Vì nó mã hóa cả IP header",
      "Vì nó dùng hash một chiều",
      "Vì nó có 128 bit block"
    ],
    "answer": 0,
    "explanation": "Ánh xạ cố định giữ lại cấu trúc thống kê của ngôn ngữ.",
    "tags": []
  },
  {
    "id": "Q029",
    "type": "mcq",
    "lesson": "Bài 3",
    "topic": "Vigenere",
    "difficulty": 2,
    "question": "Vigenère khó hơn Caesar vì lý do nào?",
    "options": [
      "Dùng nhiều độ dịch chuyển theo khóa lặp nên cùng một chữ cái có thể ra nhiều ciphertext khác nhau",
      "Không cần khóa",
      "Chỉ dùng chữ số",
      "Luôn tạo chữ ký số",
      "Chỉ chạy ở tầng mạng"
    ],
    "answer": 0,
    "explanation": "Vigenère là polyalphabetic, giảm hiệu quả tần suất đơn giản.",
    "tags": []
  },
  {
    "id": "Q030",
    "type": "mcq",
    "lesson": "Bài 3",
    "topic": "One-time pad",
    "difficulty": 3,
    "question": "Điều kiện quan trọng nhất để One-time Pad đạt an toàn lý tưởng là gì?",
    "options": [
      "Khóa ngẫu nhiên thật, dài bằng thông điệp, dùng đúng một lần và giữ bí mật",
      "Khóa ngắn hơn thông điệp",
      "Khóa được đăng công khai",
      "Dùng lại khóa nhiều lần để tiết kiệm",
      "Chỉ dùng chữ thường"
    ],
    "answer": 0,
    "explanation": "OTP mất an toàn nếu khóa không ngẫu nhiên hoặc bị dùng lại.",
    "tags": []
  },
  {
    "id": "Q031",
    "type": "mcq",
    "lesson": "Bài 3",
    "topic": "Affine cipher",
    "difficulty": 3,
    "question": "Trong affine cipher e(x)=ax+b mod 26, điều kiện của a để giải mã được là gì?",
    "options": [
      "a phải chẵn",
      "gcd(a,26)=1 để có nghịch đảo modulo",
      "a phải bằng 0",
      "a phải lớn hơn 26",
      "a phải là khóa công khai"
    ],
    "answer": 1,
    "explanation": "Cần a^{-1} mod 26 tồn tại.",
    "tags": []
  },
  {
    "id": "Q032",
    "type": "mcq",
    "lesson": "Bài 3",
    "topic": "Playfair",
    "difficulty": 2,
    "question": "Playfair mã hóa theo đơn vị nào?",
    "options": [
      "Từng bit",
      "Từng cặp ký tự/digraph",
      "Từng địa chỉ IP",
      "Từng certificate",
      "Từng port"
    ],
    "answer": 1,
    "explanation": "Playfair dùng ma trận 5x5 và xử lý từng cặp chữ.",
    "tags": []
  },
  {
    "id": "Q033",
    "type": "mcq",
    "lesson": "Bài 3",
    "topic": "Playfair rules",
    "difficulty": 3,
    "question": "Trong Playfair, nếu hai chữ nằm cùng hàng thì mã hóa bằng cách nào?",
    "options": [
      "Lấy chữ bên phải của từng chữ, vòng về đầu hàng nếu ở cuối",
      "Lấy chữ bên dưới của từng chữ",
      "Đổi chéo cột hình chữ nhật",
      "Giữ nguyên cả hai chữ",
      "XOR với khóa"
    ],
    "answer": 0,
    "explanation": "Cùng hàng: dịch sang phải; cùng cột: dịch xuống; khác hàng/cột: lấy góc chữ nhật.",
    "tags": []
  },
  {
    "id": "Q034",
    "type": "mcq",
    "lesson": "Bài 3",
    "topic": "DES",
    "difficulty": 2,
    "question": "DES dùng kích thước khối và khóa hiệu dụng nào?",
    "options": [
      "64-bit block, 56-bit key",
      "128-bit block, 128-bit key",
      "512-bit block, 160-bit key",
      "32-bit block, 96-bit key",
      "Không dùng block"
    ],
    "answer": 0,
    "explanation": "DES là block cipher 64 bit, khóa hiệu dụng 56 bit.",
    "tags": []
  },
  {
    "id": "Q035",
    "type": "mcq",
    "lesson": "Bài 3",
    "topic": "AES",
    "difficulty": 2,
    "question": "AES có kích thước block chuẩn là bao nhiêu?",
    "options": [
      "64 bit",
      "80 bit",
      "96 bit",
      "128 bit",
      "512 bit"
    ],
    "answer": 3,
    "explanation": "AES/Rijndael chuẩn dùng block 128 bit.",
    "tags": []
  },
  {
    "id": "Q036",
    "type": "mcq",
    "lesson": "Bài 3",
    "topic": "AES steps",
    "difficulty": 2,
    "question": "Bộ biến đổi nào thuộc AES?",
    "options": [
      "SubBytes, ShiftRows, MixColumns, AddRoundKey",
      "SYN, ACK, FIN, RST",
      "AH, ESP, IKE, SA",
      "CA, RA, Repository, End entity",
      "NAT, PAT, DMZ, ACL"
    ],
    "answer": 0,
    "explanation": "Đây là các bước chính của vòng AES.",
    "tags": []
  },
  {
    "id": "Q037",
    "type": "mcq",
    "lesson": "Bài 3",
    "topic": "DES vs AES",
    "difficulty": 2,
    "question": "Lý do DES bị thay bằng AES là gì?",
    "options": [
      "DES khóa 56 bit không còn đủ chống brute-force",
      "DES không thể giải mã",
      "AES chỉ dùng 8 bit",
      "DES là mã khóa công khai",
      "DES chỉ chạy trên Wi-Fi"
    ],
    "answer": 0,
    "explanation": "DES 56 bit đã bị phá bằng vét cạn; AES mạnh hơn với khóa 128/192/256 bit.",
    "tags": []
  },
  {
    "id": "Q038",
    "type": "mcq",
    "lesson": "Bài 4",
    "topic": "Public-key",
    "difficulty": 2,
    "question": "Trong mã hóa khóa công khai để bảo mật gửi cho Bob, Alice mã hóa bằng khóa nào?",
    "options": [
      "Khóa riêng của Alice",
      "Khóa công khai của Bob",
      "Khóa riêng của Bob",
      "Khóa công khai của Alice nhưng hủy đi",
      "Không dùng khóa"
    ],
    "answer": 1,
    "explanation": "Mã hóa bằng public key của người nhận; chỉ private key của người nhận giải được.",
    "tags": []
  },
  {
    "id": "Q039",
    "type": "mcq",
    "lesson": "Bài 4",
    "topic": "Digital signature",
    "difficulty": 2,
    "question": "Để tạo chữ ký số, người gửi thường dùng khóa nào để ký digest?",
    "options": [
      "Public key của người nhận",
      "Private key của chính người gửi",
      "Public key của attacker",
      "Session key của firewall",
      "Không dùng khóa"
    ],
    "answer": 1,
    "explanation": "Chữ ký số được tạo bằng private key của người ký, xác minh bằng public key tương ứng.",
    "tags": []
  },
  {
    "id": "Q040",
    "type": "mcq",
    "lesson": "Bài 4",
    "topic": "One-way function",
    "difficulty": 2,
    "question": "Ý tưởng hàm một chiều trong public-key là gì?",
    "options": [
      "Dễ tính chiều thuận nhưng khó đảo ngược nếu thiếu thông tin bí mật",
      "Dễ đảo ngược hơn chiều thuận",
      "Không cần toán học",
      "Chỉ là hàm XOR 1 bit",
      "Luôn dùng khóa 56 bit"
    ],
    "answer": 0,
    "explanation": "Ví dụ nhân p*q dễ hơn phân tích n ra p,q khi số rất lớn.",
    "tags": []
  },
  {
    "id": "Q041",
    "type": "mcq",
    "lesson": "Bài 4",
    "topic": "RSA formulas",
    "difficulty": 2,
    "question": "Trong RSA, công thức mã hóa đúng là gì?",
    "options": [
      "C = M^e mod n",
      "M = C^e mod n",
      "C = M + e + n",
      "C = H(M)",
      "C = M XOR n"
    ],
    "answer": 0,
    "explanation": "Mã hóa RSA: C = M^e mod n; giải mã M = C^d mod n.",
    "tags": []
  },
  {
    "id": "Q042",
    "type": "mcq",
    "lesson": "Bài 4",
    "topic": "RSA keygen",
    "difficulty": 2,
    "question": "Trong RSA, n được tính như thế nào?",
    "options": [
      "n = p + q",
      "n = p × q",
      "n = e × d",
      "n = phi(n) + 1",
      "n = H(p||q)"
    ],
    "answer": 1,
    "explanation": "n là tích của hai số nguyên tố p và q.",
    "tags": []
  },
  {
    "id": "Q043",
    "type": "mcq",
    "lesson": "Bài 4",
    "topic": "Diffie-Hellman",
    "difficulty": 2,
    "question": "Mục tiêu chính của Diffie-Hellman là gì?",
    "options": [
      "Trao đổi khóa bí mật chung qua kênh công khai",
      "Quét port Trojan",
      "Chặn HTTP port 80",
      "Tạo firewall DMZ",
      "Nén email"
    ],
    "answer": 0,
    "explanation": "DH cho phép hai bên tạo shared secret mà không gửi trực tiếp secret đó.",
    "tags": []
  },
  {
    "id": "Q044",
    "type": "mcq",
    "lesson": "Bài 4",
    "topic": "DH security",
    "difficulty": 3,
    "question": "Độ khó nền tảng của Diffie-Hellman dựa trên bài toán nào?",
    "options": [
      "Logarit rời rạc",
      "Sắp xếp nổi bọt",
      "Tìm đường đi ngắn nhất",
      "Nén Huffman",
      "CRC chia đa thức"
    ],
    "answer": 0,
    "explanation": "Biết g, p, g^a mod p nhưng tìm a là bài toán log rời rạc khó với tham số lớn.",
    "tags": []
  },
  {
    "id": "Q045",
    "type": "mcq",
    "lesson": "Bài 4",
    "topic": "Key management",
    "difficulty": 2,
    "question": "Khi khóa bí mật bị lộ, thao tác nào là cần thiết nhất?",
    "options": [
      "Thu hồi khóa và phân phối khóa mới càng nhanh càng tốt",
      "Công bố khóa rộng rãi",
      "Giữ nguyên khóa vì đã quen dùng",
      "Tắt toàn bộ hash",
      "Xóa public key của mọi người"
    ],
    "answer": 0,
    "explanation": "Quản lý khóa gồm thu hồi, thông báo thu hồi và phân phối khóa mới.",
    "tags": []
  },
  {
    "id": "Q046",
    "type": "mcq",
    "lesson": "Bài 5",
    "topic": "Authentication goals",
    "difficulty": 2,
    "question": "Chứng thực dữ liệu nhằm đảm bảo chính nhất điều gì?",
    "options": [
      "Nguồn gốc dữ liệu và dữ liệu không bị sửa đổi/giả mạo",
      "Tăng tốc CPU",
      "Giảm dung lượng ổ cứng",
      "Chỉ đổi IP nguồn",
      "Ẩn SSID"
    ],
    "answer": 0,
    "explanation": "Authentication xác nhận nguồn gốc và tính toàn vẹn; hỗ trợ không thể từ chối.",
    "tags": []
  },
  {
    "id": "Q047",
    "type": "mcq",
    "lesson": "Bài 5",
    "topic": "MAC",
    "difficulty": 2,
    "question": "MAC = C(K, M) cần yếu tố nào ngoài thông điệp M?",
    "options": [
      "Khóa bí mật chia sẻ K",
      "Địa chỉ MAC của card mạng",
      "Public IP",
      "SSID",
      "TTL"
    ],
    "answer": 0,
    "explanation": "MAC trong chứng thực thông điệp là Message Authentication Code, dùng khóa bí mật.",
    "tags": []
  },
  {
    "id": "Q048",
    "type": "mcq",
    "lesson": "Bài 5",
    "topic": "MAC verify",
    "difficulty": 2,
    "question": "Người nhận kiểm tra MAC bằng cách nào?",
    "options": [
      "Tính lại MAC trên M với cùng K rồi so sánh với MAC nhận",
      "Giải mã bằng public key của chính mình",
      "So sánh địa chỉ IP nguồn với DNS",
      "Chỉ nhìn kích thước file",
      "Mở port 21"
    ],
    "answer": 0,
    "explanation": "Nếu MAC trùng, thông điệp không bị sửa và đến từ bên biết khóa.",
    "tags": []
  },
  {
    "id": "Q049",
    "type": "mcq",
    "lesson": "Bài 5",
    "topic": "Hash",
    "difficulty": 2,
    "question": "Hàm băm mật mã tốt cần tính chất nào?",
    "options": [
      "Một chiều và khó tìm đụng độ",
      "Dễ đảo ngược",
      "Luôn cho output dài hơn input",
      "Phụ thuộc port TCP",
      "Chỉ chạy với khóa công khai"
    ],
    "answer": 0,
    "explanation": "Cryptographic hash cần one-way và collision resistance.",
    "tags": []
  },
  {
    "id": "Q050",
    "type": "mcq",
    "lesson": "Bài 5",
    "topic": "Digest vs MAC",
    "difficulty": 2,
    "question": "Digital digest khác MAC ở điểm nào?",
    "options": [
      "Digest không dùng khóa bí mật, MAC dùng khóa bí mật",
      "Digest luôn dùng port 443",
      "MAC không phụ thuộc thông điệp",
      "Digest chỉ dùng trong Wi-Fi",
      "Không khác nhau"
    ],
    "answer": 0,
    "explanation": "Hash/digest là không khóa; MAC là có khóa bí mật.",
    "tags": []
  },
  {
    "id": "Q051",
    "type": "mcq",
    "lesson": "Bài 5",
    "topic": "HMAC",
    "difficulty": 2,
    "question": "HMAC là sự kết hợp của gì?",
    "options": [
      "Hàm băm với khóa bí mật",
      "NAT với DMZ",
      "DES với ARP",
      "SSH với Telnet",
      "Wireshark với Tcpdump"
    ],
    "answer": 0,
    "explanation": "HMAC = keyed-hash message authentication code.",
    "tags": []
  },
  {
    "id": "Q052",
    "type": "mcq",
    "lesson": "Bài 5",
    "topic": "Digital signature flow",
    "difficulty": 2,
    "question": "Quy trình ký số phổ biến là gì?",
    "options": [
      "Băm thông điệp rồi mã hóa digest bằng private key người gửi",
      "Mã hóa thông điệp bằng public key của attacker",
      "Chỉ gửi mật khẩu plaintext",
      "Tạo ACL rồi NAT",
      "Chia sẻ private key cho mọi người"
    ],
    "answer": 0,
    "explanation": "Ký digest giảm kích thước xử lý và bảo vệ toàn vẹn.",
    "tags": []
  },
  {
    "id": "Q053",
    "type": "mcq",
    "lesson": "Bài 5",
    "topic": "MD5/SHA",
    "difficulty": 2,
    "question": "Vì sao MD5 hiện ít được dùng cho bảo mật?",
    "options": [
      "Độ dài hash 128 bit và đã có vấn đề đụng độ",
      "Không thể tính hash",
      "Chỉ chạy trên Windows XP",
      "Luôn yêu cầu NAT",
      "Không dùng được cho file"
    ],
    "answer": 0,
    "explanation": "MD5 yếu về collision resistance, nên thay bằng SHA-2/thuật toán mạnh hơn.",
    "tags": []
  },
  {
    "id": "Q054",
    "type": "mcq",
    "lesson": "Bài 6",
    "topic": "Security layers",
    "difficulty": 2,
    "question": "IPsec hoạt động chủ yếu ở lớp nào?",
    "options": [
      "Tầng mạng/Internet layer",
      "Tầng ứng dụng duy nhất",
      "Tầng vật lý",
      "Tầng trình diễn duy nhất",
      "Không thuộc TCP/IP"
    ],
    "answer": 0,
    "explanation": "IPsec bảo vệ gói IP ở network layer.",
    "tags": []
  },
  {
    "id": "Q055",
    "type": "mcq",
    "lesson": "Bài 6",
    "topic": "TLS",
    "difficulty": 2,
    "question": "SSL/TLS nằm chủ yếu ở lớp nào trong cách phân loại của slide?",
    "options": [
      "Tầng vận chuyển",
      "Tầng liên kết dữ liệu",
      "Tầng vật lý",
      "Tầng mạng như IPsec",
      "Tầng điện áp"
    ],
    "answer": 0,
    "explanation": "TLS bảo vệ kết nối transport cho ứng dụng như HTTPS.",
    "tags": []
  },
  {
    "id": "Q056",
    "type": "mcq",
    "lesson": "Bài 6",
    "topic": "PGP S/MIME",
    "difficulty": 2,
    "question": "PGP và S/MIME chủ yếu được dùng cho lĩnh vực nào?",
    "options": [
      "Bảo mật email/tầng ứng dụng",
      "Chuyển mạch Ethernet",
      "Định tuyến RIP",
      "NAT địa chỉ private",
      "Quét port Trojan"
    ],
    "answer": 0,
    "explanation": "PGP/S/MIME là giải pháp bảo mật email.",
    "tags": []
  },
  {
    "id": "Q057",
    "type": "mcq",
    "lesson": "Bài 6",
    "topic": "PKI components",
    "difficulty": 2,
    "question": "Bộ thành phần nào thuộc PKIX/X.509?",
    "options": [
      "End entity, CA, RA, Repository",
      "SYN, ACK, FIN, RST",
      "SubBytes, ShiftRows, MixColumns, AddRoundKey",
      "SSID, BSSID, ESSID, RSSI",
      "LAN, WAN, NAT, PAT"
    ],
    "answer": 0,
    "explanation": "PKIX gồm thực thể cuối, CA, RA và kho lưu trữ.",
    "tags": []
  },
  {
    "id": "Q058",
    "type": "mcq",
    "lesson": "Bài 6",
    "topic": "X.509 certificate",
    "difficulty": 2,
    "question": "Trường nào KHÔNG phải thành phần cơ bản của chứng chỉ X.509?",
    "options": [
      "Issuer",
      "Validity period",
      "Subject",
      "Public key",
      "Private key của chủ sở hữu dưới dạng rõ"
    ],
    "answer": 4,
    "explanation": "Chứng chỉ chứa public key, không chứa private key dạng rõ.",
    "tags": []
  },
  {
    "id": "Q059",
    "type": "mcq",
    "lesson": "Bài 6",
    "topic": "IPsec AH ESP",
    "difficulty": 2,
    "question": "AH trong IPsec chủ yếu cung cấp gì?",
    "options": [
      "Xác thực nguồn gốc và toàn vẹn gói IP",
      "Mã hóa nội dung email theo MIME",
      "Cấp địa chỉ DHCP",
      "Dịch địa chỉ NAT",
      "Nén ảnh trong web"
    ],
    "answer": 0,
    "explanation": "AH = Authentication Header, tập trung vào xác thực/toàn vẹn.",
    "tags": []
  },
  {
    "id": "Q060",
    "type": "mcq",
    "lesson": "Bài 6",
    "topic": "IPsec AH ESP",
    "difficulty": 2,
    "question": "ESP trong IPsec nổi bật hơn AH ở điểm nào?",
    "options": [
      "Có thể mã hóa payload/gói được bảo vệ",
      "Chỉ cấp chứng chỉ",
      "Chỉ chạy ở tầng ứng dụng",
      "Không dùng sequence number",
      "Không liên quan SA"
    ],
    "answer": 0,
    "explanation": "ESP = Encapsulating Security Payload, hỗ trợ mã hóa và có thể chứng thực.",
    "tags": []
  },
  {
    "id": "Q061",
    "type": "mcq",
    "lesson": "Bài 6",
    "topic": "IPsec mode",
    "difficulty": 3,
    "question": "Tunnel mode của IPsec phù hợp nhất với trường hợp nào?",
    "options": [
      "Site-to-site VPN qua Internet giữa hai gateway",
      "Chỉ bảo vệ một file Word local",
      "Mã hóa một ô trong Excel",
      "Quét virus bằng heuristic",
      "Tạo mật khẩu một lần"
    ],
    "answer": 0,
    "explanation": "Tunnel mode thường bảo vệ gateway-to-gateway, gói IP được bọc trong gói mới.",
    "tags": []
  },
  {
    "id": "Q062",
    "type": "mcq",
    "lesson": "Bài 6",
    "topic": "SSL handshake",
    "difficulty": 2,
    "question": "Giai đoạn đầu của SSL/TLS handshake thường nhằm mục tiêu gì?",
    "options": [
      "Thỏa thuận phiên bản/cipher suite và thông số bảo mật",
      "Mở port Trojan",
      "Tạo bảng NAT",
      "Chọn SSID Wi-Fi",
      "Chạy Caesar cipher"
    ],
    "answer": 0,
    "explanation": "ClientHello/ServerHello dùng để chọn cơ chế mã hóa/tham số.",
    "tags": []
  },
  {
    "id": "Q063",
    "type": "mcq",
    "lesson": "Bài 6",
    "topic": "Kerberos",
    "difficulty": 2,
    "question": "Kerberos cần yếu tố trung tâm nào?",
    "options": [
      "Bên thứ ba tin cậy/KDC và mật mã khóa đối xứng",
      "Chỉ một public key tự do",
      "Một firewall stateless",
      "Một SSID ẩn",
      "Một port FTP mở"
    ],
    "answer": 0,
    "explanation": "Kerberos dựa trên trusted third party để cấp ticket xác thực.",
    "tags": []
  },
  {
    "id": "Q064",
    "type": "mcq",
    "lesson": "Bài 6",
    "topic": "SSH",
    "difficulty": 2,
    "question": "SSH thay thế Telnet ở điểm bảo mật quan trọng nào?",
    "options": [
      "Mã hóa kênh đăng nhập/trao đổi dữ liệu từ xa",
      "Gửi password plaintext nhanh hơn",
      "Không có xác thực",
      "Chỉ dùng UDP 520",
      "Bỏ qua host key"
    ],
    "answer": 0,
    "explanation": "SSH bảo vệ remote login bằng mã hóa và xác thực.",
    "tags": []
  },
  {
    "id": "Q065",
    "type": "mcq",
    "lesson": "Bài 7",
    "topic": "Wireless overview",
    "difficulty": 2,
    "question": "Trong Wi-Fi, SSID là gì?",
    "options": [
      "Tên logic của mạng không dây để client nhận diện/kết nối",
      "Địa chỉ MAC duy nhất của AP",
      "Khóa riêng RSA",
      "Port TCP mặc định",
      "Một thuật toán hash"
    ],
    "answer": 0,
    "explanation": "SSID là tên mạng Wi-Fi được quảng bá hoặc cấu hình ẩn.",
    "tags": []
  },
  {
    "id": "Q066",
    "type": "mcq",
    "lesson": "Bài 7",
    "topic": "Wireless authentication",
    "difficulty": 2,
    "question": "Hai kiểu chứng thực WEP cơ bản thường gặp là gì?",
    "options": [
      "Open System và Shared Key",
      "RSA và DSA",
      "AH và ESP",
      "SYN và ACK",
      "NAT và PAT"
    ],
    "answer": 0,
    "explanation": "WEP có Open System Authentication và Shared Key Authentication.",
    "tags": []
  },
  {
    "id": "Q067",
    "type": "mcq",
    "lesson": "Bài 7",
    "topic": "WEP weakness",
    "difficulty": 2,
    "question": "Điểm yếu kinh điển của WEP là gì?",
    "options": [
      "IV ngắn/tái sử dụng và RC4 yếu trong cách triển khai",
      "Dùng AES-CCMP quá mạnh",
      "Không có frame 802.11",
      "Luôn yêu cầu certificate",
      "Không dùng khóa"
    ],
    "answer": 0,
    "explanation": "WEP có thể bị phá khi thu đủ IV/traffic.",
    "tags": []
  },
  {
    "id": "Q068",
    "type": "mcq",
    "lesson": "Bài 7",
    "topic": "WPA2",
    "difficulty": 2,
    "question": "WPA2-Personal thường dùng cơ chế mã hóa/chế độ nào?",
    "options": [
      "AES-CCMP",
      "DES-ECB",
      "Caesar",
      "MD5-only",
      "Telnet plaintext"
    ],
    "answer": 0,
    "explanation": "WPA2 chuẩn mạnh hơn WEP/WPA cũ nhờ AES-CCMP.",
    "tags": []
  },
  {
    "id": "Q069",
    "type": "mcq",
    "lesson": "Bài 7",
    "topic": "Wireless attacks",
    "difficulty": 2,
    "question": "Evil Twin trong Wi-Fi là kiểu tấn công nào?",
    "options": [
      "AP giả mạo giống mạng thật để dụ người dùng kết nối",
      "Tăng độ dài khóa AES",
      "Chỉ nghe radio FM",
      "Cấp chứng chỉ X.509 hợp lệ",
      "Bật firewall stateful"
    ],
    "answer": 0,
    "explanation": "Evil Twin dựng AP giả để đánh cắp thông tin/MITM.",
    "tags": []
  },
  {
    "id": "Q070",
    "type": "mcq",
    "lesson": "Bài 7",
    "topic": "Wireless attacks",
    "difficulty": 3,
    "question": "Deauthentication attack trong Wi-Fi thường nhằm mục tiêu gì?",
    "options": [
      "Ép client rớt khỏi AP để bắt handshake hoặc gây gián đoạn",
      "Tính khóa RSA d",
      "Cấp DHCP hợp pháp",
      "Ký email S/MIME",
      "Nén payload IPsec"
    ],
    "answer": 0,
    "explanation": "Deauth frame có thể bị lợi dụng để làm client kết nối lại, tạo handshake để bắt.",
    "tags": []
  },
  {
    "id": "Q071",
    "type": "mcq",
    "lesson": "Bài 7",
    "topic": "Wireless defense",
    "difficulty": 2,
    "question": "Biện pháp nào phù hợp để tăng bảo mật Wi-Fi gia đình/cơ quan nhỏ?",
    "options": [
      "WPA2/WPA3 với mật khẩu mạnh, tắt WPS, cập nhật firmware",
      "Dùng WEP vì dễ nhớ",
      "Công khai mật khẩu trên bảng thông báo",
      "Dùng SSID trùng với mật khẩu",
      "Bỏ mã hóa để tăng tốc"
    ],
    "answer": 0,
    "explanation": "WEP/WPS yếu; cần WPA2/3, passphrase mạnh, cập nhật thiết bị.",
    "tags": []
  },
  {
    "id": "Q072",
    "type": "mcq",
    "lesson": "Bài 7",
    "topic": "Bluetooth",
    "difficulty": 2,
    "question": "Bluejacking/Bluesnarfing liên quan đến môi trường nào?",
    "options": [
      "Bluetooth",
      "IPsec",
      "RSA",
      "Firewall DMZ",
      "DES round key"
    ],
    "answer": 0,
    "explanation": "Đây là các kiểu tấn công Bluetooth.",
    "tags": []
  },
  {
    "id": "Q073",
    "type": "mcq",
    "lesson": "Bài 8",
    "topic": "Firewall",
    "difficulty": 2,
    "question": "Firewall được mô tả đúng nhất là gì?",
    "options": [
      "Hàng rào kiểm soát lưu lượng giữa mạng tin cậy và không tin cậy theo chính sách",
      "Thuật toán hash một chiều",
      "Bộ tạo khóa RSA",
      "Dịch vụ cấp email S/MIME",
      "Mã cổ điển theo cặp chữ"
    ],
    "answer": 0,
    "explanation": "Firewall cho phép/chặn gói tin dựa trên rule, nguyên tắc quyền tối thiểu.",
    "tags": []
  },
  {
    "id": "Q074",
    "type": "mcq",
    "lesson": "Bài 8",
    "topic": "Firewall types",
    "difficulty": 2,
    "question": "Packet filter kiểm tra chủ yếu phần nào?",
    "options": [
      "IP header và TCP/UDP header, không kiểm tra sâu payload ứng dụng",
      "Nội dung MIME và SQL trong payload là chính",
      "Chỉ chữ ký số",
      "Chỉ ma trận AES",
      "Chỉ ảnh nền web"
    ],
    "answer": 0,
    "explanation": "Packet filter cơ bản dựa vào header và ACL.",
    "tags": []
  },
  {
    "id": "Q075",
    "type": "mcq",
    "lesson": "Bài 8",
    "topic": "Stateless",
    "difficulty": 2,
    "question": "Stateless filtering có đặc điểm nào?",
    "options": [
      "Xử lý mỗi gói độc lập, không lưu trạng thái kết nối",
      "Luôn giải mã TLS",
      "Tạo ticket Kerberos",
      "Bắt buộc dùng proxy web",
      "Không dùng ACL"
    ],
    "answer": 0,
    "explanation": "Stateless không nhớ lịch sử phiên, đơn giản nhưng hạn chế.",
    "tags": []
  },
  {
    "id": "Q076",
    "type": "mcq",
    "lesson": "Bài 8",
    "topic": "Stateful",
    "difficulty": 2,
    "question": "Stateful filtering khác stateless ở điểm nào?",
    "options": [
      "Lưu thông tin kết nối trong state table để quyết định gói tiếp theo",
      "Không kiểm tra header",
      "Chỉ hoạt động ở tầng ứng dụng",
      "Luôn yếu hơn WEP",
      "Không tốn RAM/CPU"
    ],
    "answer": 0,
    "explanation": "Stateful theo dõi TCP/UDP connection state.",
    "tags": []
  },
  {
    "id": "Q077",
    "type": "mcq",
    "lesson": "Bài 8",
    "topic": "Application gateway",
    "difficulty": 2,
    "question": "Application gateway/proxy mạnh hơn packet filter ở điểm nào?",
    "options": [
      "Có thể kiểm tra payload/định dạng ứng dụng như HTTP, MIME, SQL",
      "Chỉ nhìn IP header",
      "Không cần phần mềm",
      "Không tạo log",
      "Chỉ chạy tầng vật lý"
    ],
    "answer": 0,
    "explanation": "Proxy tầng ứng dụng hiểu protocol cao hơn và kiểm tra sâu hơn.",
    "tags": []
  },
  {
    "id": "Q078",
    "type": "mcq",
    "lesson": "Bài 8",
    "topic": "Circuit gateway",
    "difficulty": 2,
    "question": "Circuit-level gateway chủ yếu làm gì?",
    "options": [
      "Xác nhận phiên TCP/UDP và chuyển tiếp kết nối qua hai phía",
      "Băm file bằng SHA-512",
      "Cấp chứng chỉ X.509",
      "Phát SSID Wi-Fi",
      "Tính Caesar shift"
    ],
    "answer": 0,
    "explanation": "Circuit gateway duy trì bảng kết nối hợp lệ, thường như transparent proxy firewall.",
    "tags": []
  },
  {
    "id": "Q079",
    "type": "mcq",
    "lesson": "Bài 8",
    "topic": "Bastion host",
    "difficulty": 2,
    "question": "Bastion host nên được cấu hình như thế nào?",
    "options": [
      "Tối giản dịch vụ, hardening mạnh, log đầy đủ, không chạy quyền admin không cần thiết",
      "Cài càng nhiều dịch vụ càng tốt",
      "Tắt toàn bộ log",
      "Dùng OS không cập nhật",
      "Cho mọi host nội bộ kết nối trực tiếp không kiểm soát"
    ],
    "answer": 0,
    "explanation": "Bastion host là máy lộ diện cần phòng thủ mạnh và tối giản bề mặt tấn công.",
    "tags": []
  },
  {
    "id": "Q080",
    "type": "mcq",
    "lesson": "Bài 8",
    "topic": "DMZ",
    "difficulty": 2,
    "question": "Web server/Mail server public thường nên đặt ở đâu?",
    "options": [
      "DMZ/vùng ngoại vi tách khỏi mạng nội bộ",
      "Máy cá nhân của kế toán",
      "Trong vùng core database không firewall",
      "Trên KDC Kerberos",
      "Trong file SAM"
    ],
    "answer": 0,
    "explanation": "DMZ chứa server cần public, giảm rủi ro lan vào internal network.",
    "tags": []
  },
  {
    "id": "Q081",
    "type": "mcq",
    "lesson": "Bài 8",
    "topic": "Screened subnet",
    "difficulty": 3,
    "question": "Cấu hình Screened Subnet được xem bảo mật cao vì gì?",
    "options": [
      "Có bastion host và hai packet-filtering router tạo vùng mạng con cô lập ở giữa",
      "Chỉ dùng một router không ACL",
      "Không cần firewall",
      "Đặt mọi server trong mạng nội bộ",
      "Dùng WEP thay WPA2"
    ],
    "answer": 0,
    "explanation": "Screened subnet tạo lớp lọc ngoài/inner và vùng đệm.",
    "tags": []
  },
  {
    "id": "Q082",
    "type": "mcq",
    "lesson": "Bài 8",
    "topic": "NAT",
    "difficulty": 2,
    "question": "NAT có vai trò chính nào?",
    "options": [
      "Chuyển dịch địa chỉ private/public, giúp host private truy cập Internet và che giấu cấu trúc nội bộ phần nào",
      "Tạo chữ ký số",
      "Tăng độ dài hash",
      "Thay thế hoàn toàn firewall ứng dụng",
      "Giải mã RSA"
    ],
    "answer": 0,
    "explanation": "NAT dịch địa chỉ, thường đi cùng firewall nhưng không thay thế chính sách bảo mật đầy đủ.",
    "tags": []
  },
  {
    "id": "Q083",
    "type": "mcq",
    "lesson": "Tổng hợp",
    "topic": "Phân biệt cơ chế",
    "difficulty": 3,
    "question": "Một hệ thống cần bảo vệ email sao cho người nhận xác minh được người gửi và nội dung không bị sửa. Cơ chế phù hợp nhất là gì?",
    "options": [
      "Chữ ký số dựa trên hash + private key người gửi",
      "Chỉ NAT địa chỉ nguồn",
      "Ẩn SSID",
      "Dùng WEP shared key",
      "Chỉ stateless ACL"
    ],
    "answer": 0,
    "explanation": "Chữ ký số cung cấp authentication, integrity và non-repudiation tốt hơn MAC khi không chia sẻ khóa bí mật.",
    "tags": []
  },
  {
    "id": "Q084",
    "type": "mcq",
    "lesson": "Tổng hợp",
    "topic": "Phân biệt cơ chế",
    "difficulty": 3,
    "question": "Một attacker đứng giữa client và server, đọc/sửa gói rồi chuyển tiếp. Cặp biện pháp phòng thủ trực tiếp nhất là gì?",
    "options": [
      "Mã hóa + chứng thực kênh truyền",
      "Chỉ đổi tên file",
      "Chỉ dùng port 80",
      "Chỉ dùng password ngắn",
      "Tắt log firewall"
    ],
    "answer": 0,
    "explanation": "MITM cần được chống bằng mã hóa và xác thực endpoint/gói tin.",
    "tags": []
  },
  {
    "id": "Q085",
    "type": "mcq",
    "lesson": "Tổng hợp",
    "topic": "Phân biệt cơ chế",
    "difficulty": 3,
    "question": "Một firewall chỉ chặn theo source IP, destination IP, port và protocol, không hiểu nội dung HTTP. Đây là loại nào?",
    "options": [
      "Packet filter",
      "Application gateway",
      "Kerberos KDC",
      "Certificate Authority",
      "WPA2-Enterprise"
    ],
    "answer": 0,
    "explanation": "Packet filter dựa vào header/rule, không kiểm tra payload ứng dụng.",
    "tags": []
  },
  {
    "id": "Q086",
    "type": "mcq",
    "lesson": "Tổng hợp",
    "topic": "Phân biệt cơ chế",
    "difficulty": 3,
    "question": "Trong công thức A → B: E(PUb, E(PRa, M)), lớp trong và lớp ngoài lần lượt cung cấp gì?",
    "options": [
      "Lớp trong PRa: chữ ký/chứng thực; lớp ngoài PUb: bảo mật cho B",
      "Lớp trong PUb: NAT; lớp ngoài PRa: firewall",
      "Cả hai chỉ chống virus",
      "Không lớp nào có ý nghĩa",
      "Lớp trong là WEP, lớp ngoài là WPA2"
    ],
    "answer": 0,
    "explanation": "Ký bằng private key người gửi, sau đó mã hóa bằng public key người nhận.",
    "tags": []
  },
  {
    "id": "Q087",
    "type": "mcq",
    "lesson": "Tổng hợp",
    "topic": "Gài bẫy thuật ngữ",
    "difficulty": 3,
    "question": "Câu nào dễ gây nhầm nhưng đúng?",
    "options": [
      "MAC trong chứng thực thông điệp không phải là địa chỉ MAC của card mạng",
      "Hash luôn cần khóa bí mật",
      "Public key phải giữ bí mật tuyệt đối",
      "NAT luôn thay thế được firewall",
      "SSID là mật khẩu Wi-Fi"
    ],
    "answer": 0,
    "explanation": "Message Authentication Code khác Media Access Control address.",
    "tags": []
  },
  {
    "id": "Q088",
    "type": "mcq",
    "lesson": "Tổng hợp",
    "topic": "Gài bẫy thuật ngữ",
    "difficulty": 3,
    "question": "Nếu một câu hỏi nói “chống người gửi phủ nhận đã gửi thông điệp”, keyword nên chốt là gì?",
    "options": [
      "Non-repudiation / chữ ký số",
      "Availability / backup",
      "NAT / PAT",
      "SSID / BSSID",
      "Packet fragmentation"
    ],
    "answer": 0,
    "explanation": "Không thể từ chối thường gắn với chữ ký số dùng khóa riêng.",
    "tags": []
  },
  {
    "id": "Q089",
    "type": "tf",
    "lesson": "Bài 1",
    "topic": "CIA",
    "difficulty": 2,
    "question": "Availability nghĩa là hệ thống/dữ liệu sẵn sàng cho người dùng hợp pháp khi cần.",
    "options": [],
    "answer": true,
    "explanation": "Availability là tính sẵn sàng.",
    "tags": []
  },
  {
    "id": "Q090",
    "type": "tf",
    "lesson": "Bài 1",
    "topic": "Eavesdropping",
    "difficulty": 2,
    "question": "Mã hóa dữ liệu trước khi truyền là biện pháp quan trọng để chống nghe lén trên mạng công cộng.",
    "options": [],
    "answer": true,
    "explanation": "Dù không ngăn được bắt gói, attacker khó đọc nội dung.",
    "tags": []
  },
  {
    "id": "Q091",
    "type": "tf",
    "lesson": "Bài 1",
    "topic": "Replay",
    "difficulty": 3,
    "question": "Replay attack luôn cần attacker biết private key của nạn nhân.",
    "options": [],
    "answer": false,
    "explanation": "Replay có thể lợi dụng thông điệp/ticket hợp lệ đã bắt được.",
    "tags": []
  },
  {
    "id": "Q092",
    "type": "tf",
    "lesson": "Bài 2a",
    "topic": "Trojan",
    "difficulty": 2,
    "question": "Trojan thường tự nhân bản mạnh như virus và worm.",
    "options": [],
    "answer": false,
    "explanation": "Trojan thường không tự nhân bản.",
    "tags": []
  },
  {
    "id": "Q093",
    "type": "tf",
    "lesson": "Bài 2a",
    "topic": "RAT",
    "difficulty": 2,
    "question": "RAT có thể cho attacker điều khiển máy nạn nhân từ xa.",
    "options": [],
    "answer": true,
    "explanation": "Đây là bản chất Remote Access Trojan.",
    "tags": []
  },
  {
    "id": "Q094",
    "type": "tf",
    "lesson": "Bài 2b",
    "topic": "Virus",
    "difficulty": 2,
    "question": "Virus file thường cần gắn vào chương trình/tập tin chủ để được thực thi.",
    "options": [],
    "answer": true,
    "explanation": "Virus thường ký sinh vào host file.",
    "tags": []
  },
  {
    "id": "Q095",
    "type": "tf",
    "lesson": "Bài 2b",
    "topic": "Heuristic",
    "difficulty": 2,
    "question": "Heuristic scanning chỉ phát hiện được virus đã có chữ ký trong database.",
    "options": [],
    "answer": false,
    "explanation": "Heuristic dựa vào hành vi/mẫu đáng ngờ.",
    "tags": []
  },
  {
    "id": "Q096",
    "type": "tf",
    "lesson": "Bài 3",
    "topic": "DES",
    "difficulty": 2,
    "question": "DES có khóa hiệu dụng 56 bit nên hiện không còn phù hợp cho hệ thống quan trọng.",
    "options": [],
    "answer": true,
    "explanation": "DES yếu trước brute-force hiện đại.",
    "tags": []
  },
  {
    "id": "Q097",
    "type": "tf",
    "lesson": "Bài 3",
    "topic": "AES",
    "difficulty": 2,
    "question": "AES dùng block 128 bit và hỗ trợ khóa 128/192/256 bit.",
    "options": [],
    "answer": true,
    "explanation": "Đây là thông số chuẩn.",
    "tags": []
  },
  {
    "id": "Q098",
    "type": "tf",
    "lesson": "Bài 3",
    "topic": "Vigenere",
    "difficulty": 2,
    "question": "Vigenère là mã đa bảng, khóa lặp tạo nhiều độ dịch chuyển.",
    "options": [],
    "answer": true,
    "explanation": "Polyalphabetic cipher.",
    "tags": []
  },
  {
    "id": "Q099",
    "type": "tf",
    "lesson": "Bài 4",
    "topic": "RSA",
    "difficulty": 2,
    "question": "Trong RSA, public key thường gồm n và e; private key chứa d.",
    "options": [],
    "answer": true,
    "explanation": "Cặp thường viết PU=(n,e), PR=(n,d).",
    "tags": []
  },
  {
    "id": "Q100",
    "type": "tf",
    "lesson": "Bài 4",
    "topic": "DH",
    "difficulty": 2,
    "question": "Diffie-Hellman trực tiếp gửi khóa bí mật chung qua mạng để hai bên dùng.",
    "options": [],
    "answer": false,
    "explanation": "DH gửi giá trị công khai, không gửi shared secret trực tiếp.",
    "tags": []
  },
  {
    "id": "Q101",
    "type": "tf",
    "lesson": "Bài 5",
    "topic": "MAC",
    "difficulty": 2,
    "question": "MAC giúp kiểm tra toàn vẹn và xác thực nguồn giữa các bên chia sẻ khóa bí mật.",
    "options": [],
    "answer": true,
    "explanation": "MAC dùng K chung.",
    "tags": []
  },
  {
    "id": "Q102",
    "type": "tf",
    "lesson": "Bài 5",
    "topic": "Hash",
    "difficulty": 2,
    "question": "Hàm băm mật mã tốt nên dễ đảo ngược để lấy lại thông điệp gốc.",
    "options": [],
    "answer": false,
    "explanation": "Hàm băm cần tính một chiều.",
    "tags": []
  },
  {
    "id": "Q103",
    "type": "tf",
    "lesson": "Bài 5",
    "topic": "Chữ ký số",
    "difficulty": 2,
    "question": "Chữ ký số thường ký trên digest thay vì toàn bộ thông điệp dài.",
    "options": [],
    "answer": true,
    "explanation": "Ký digest hiệu quả và đủ kiểm tra toàn vẹn.",
    "tags": []
  },
  {
    "id": "Q104",
    "type": "tf",
    "lesson": "Bài 6",
    "topic": "IPsec",
    "difficulty": 2,
    "question": "AH và ESP có thể cùng lúc nằm trong cùng một Security Association.",
    "options": [],
    "answer": false,
    "explanation": "Slide nêu một SA xác định AH hay ESP, không dùng đồng thời trong cùng SA.",
    "tags": []
  },
  {
    "id": "Q105",
    "type": "tf",
    "lesson": "Bài 6",
    "topic": "TLS",
    "difficulty": 2,
    "question": "TLS handshake có bước thỏa thuận thuật toán/cipher suite.",
    "options": [],
    "answer": true,
    "explanation": "Client/server chọn bộ mã và thông số.",
    "tags": []
  },
  {
    "id": "Q106",
    "type": "tf",
    "lesson": "Bài 6",
    "topic": "Kerberos",
    "difficulty": 2,
    "question": "Kerberos dựa trên một bên thứ ba tin cậy và mật mã khóa đối xứng.",
    "options": [],
    "answer": true,
    "explanation": "KDC là thành phần trung tâm.",
    "tags": []
  },
  {
    "id": "Q107",
    "type": "tf",
    "lesson": "Bài 7",
    "topic": "WEP",
    "difficulty": 2,
    "question": "WEP được xem là yếu và không nên dùng nếu có WPA2/WPA3.",
    "options": [],
    "answer": true,
    "explanation": "WEP có nhiều lỗ hổng thiết kế/triển khai.",
    "tags": []
  },
  {
    "id": "Q108",
    "type": "tf",
    "lesson": "Bài 7",
    "topic": "SSID",
    "difficulty": 1,
    "question": "SSID chính là mật khẩu Wi-Fi.",
    "options": [],
    "answer": false,
    "explanation": "SSID là tên mạng.",
    "tags": []
  },
  {
    "id": "Q109",
    "type": "tf",
    "lesson": "Bài 8",
    "topic": "Firewall",
    "difficulty": 2,
    "question": "Packet filter cơ bản không kiểm tra sâu payload ứng dụng.",
    "options": [],
    "answer": true,
    "explanation": "Nó kiểm tra header/rule.",
    "tags": []
  },
  {
    "id": "Q110",
    "type": "tf",
    "lesson": "Bài 8",
    "topic": "Stateful",
    "difficulty": 2,
    "question": "Stateful firewall lưu trạng thái kết nối trong state table.",
    "options": [],
    "answer": true,
    "explanation": "Đây là điểm khác stateless.",
    "tags": []
  },
  {
    "id": "Q111",
    "type": "tf",
    "lesson": "Bài 8",
    "topic": "Bastion",
    "difficulty": 2,
    "question": "Bastion host nên chạy càng nhiều dịch vụ càng tốt để tiện quản trị.",
    "options": [],
    "answer": false,
    "explanation": "Cần giảm bề mặt tấn công.",
    "tags": []
  },
  {
    "id": "Q112",
    "type": "tf",
    "lesson": "Bài 8",
    "topic": "NAT",
    "difficulty": 2,
    "question": "NAT giúp dịch địa chỉ private sang public nhưng không tự động thay thế mọi chức năng firewall.",
    "options": [],
    "answer": true,
    "explanation": "NAT không phải chính sách bảo mật đầy đủ.",
    "tags": []
  },
  {
    "id": "Q113",
    "type": "fill",
    "lesson": "Bài 1",
    "topic": "CIA",
    "difficulty": 2,
    "question": "Bộ ba/tứ thuộc tính an toàn dữ liệu có Confidentiality, Integrity, Availability và ________.",
    "options": [],
    "answer": "Non-repudiation",
    "explanation": "Không thể từ chối là yêu cầu được nêu trong slide.",
    "tags": []
  },
  {
    "id": "Q114",
    "type": "fill",
    "lesson": "Bài 1",
    "topic": "Password",
    "difficulty": 2,
    "question": "Tấn công dò mật khẩu bằng danh sách từ phổ biến gọi là ________ attack.",
    "options": [],
    "answer": "Dictionary",
    "explanation": "Dictionary attack dùng từ điển mật khẩu/hash.",
    "tags": []
  },
  {
    "id": "Q115",
    "type": "fill",
    "lesson": "Bài 2a",
    "topic": "Trojan",
    "difficulty": 2,
    "question": "Trojan điều khiển từ xa thường được viết tắt là ________.",
    "options": [],
    "answer": "RAT",
    "explanation": "Remote Access Trojan.",
    "tags": []
  },
  {
    "id": "Q116",
    "type": "fill",
    "lesson": "Bài 2a",
    "topic": "Ports",
    "difficulty": 2,
    "question": "Back Orifice thường gắn với port ________.",
    "options": [],
    "answer": "31337",
    "explanation": "Port kinh điển trong slide Trojan.",
    "tags": []
  },
  {
    "id": "Q117",
    "type": "fill",
    "lesson": "Bài 2b",
    "topic": "Virus",
    "difficulty": 2,
    "question": "Virus thay đổi hình thức/mã giải mã qua mỗi lần lây nhiễm gọi là virus ________.",
    "options": [],
    "answer": "đa hình / polymorphic",
    "explanation": "Polymorphic virus chống signature.",
    "tags": []
  },
  {
    "id": "Q118",
    "type": "fill",
    "lesson": "Bài 3",
    "topic": "Caesar",
    "difficulty": 2,
    "question": "Công thức mã hóa Caesar là C = (p + k) mod ________.",
    "options": [],
    "answer": "26",
    "explanation": "Bảng chữ cái tiếng Anh có 26 chữ.",
    "tags": []
  },
  {
    "id": "Q119",
    "type": "fill",
    "lesson": "Bài 3",
    "topic": "AES",
    "difficulty": 2,
    "question": "AES biểu diễn block 128 bit thành ma trận trạng thái ________ byte.",
    "options": [],
    "answer": "4x4 / 16",
    "explanation": "128 bit = 16 byte = 4x4.",
    "tags": []
  },
  {
    "id": "Q120",
    "type": "fill",
    "lesson": "Bài 3",
    "topic": "DES",
    "difficulty": 2,
    "question": "DES dùng block 64 bit và khóa hiệu dụng ________ bit.",
    "options": [],
    "answer": "56",
    "explanation": "DES key hiệu dụng 56 bit.",
    "tags": []
  },
  {
    "id": "Q121",
    "type": "fill",
    "lesson": "Bài 4",
    "topic": "RSA",
    "difficulty": 2,
    "question": "Trong RSA, n = p × ________.",
    "options": [],
    "answer": "q",
    "explanation": "n là tích hai số nguyên tố.",
    "tags": []
  },
  {
    "id": "Q122",
    "type": "fill",
    "lesson": "Bài 4",
    "topic": "DH",
    "difficulty": 2,
    "question": "Diffie-Hellman dựa trên bài toán khó ________ rời rạc.",
    "options": [],
    "answer": "logarit",
    "explanation": "Discrete logarithm.",
    "tags": []
  },
  {
    "id": "Q123",
    "type": "fill",
    "lesson": "Bài 5",
    "topic": "MAC",
    "difficulty": 2,
    "question": "Mã chứng thực thông điệp được viết tắt là ________.",
    "options": [],
    "answer": "MAC",
    "explanation": "Message Authentication Code.",
    "tags": []
  },
  {
    "id": "Q124",
    "type": "fill",
    "lesson": "Bài 5",
    "topic": "HMAC",
    "difficulty": 2,
    "question": "HMAC là mã chứng thực dựa trên ________ có khóa.",
    "options": [],
    "answer": "hàm băm / hash",
    "explanation": "Keyed-hash.",
    "tags": []
  },
  {
    "id": "Q125",
    "type": "fill",
    "lesson": "Bài 6",
    "topic": "PKI",
    "difficulty": 2,
    "question": "Trong PKI, tổ chức cấp và thu hồi chứng chỉ gọi là ________.",
    "options": [],
    "answer": "CA",
    "explanation": "Certificate Authority.",
    "tags": []
  },
  {
    "id": "Q126",
    "type": "fill",
    "lesson": "Bài 6",
    "topic": "IPsec",
    "difficulty": 2,
    "question": "Trong IPsec, IKE dùng để trao đổi/thiết lập ________.",
    "options": [],
    "answer": "khóa",
    "explanation": "Internet Key Exchange.",
    "tags": []
  },
  {
    "id": "Q127",
    "type": "fill",
    "lesson": "Bài 6",
    "topic": "Kerberos",
    "difficulty": 2,
    "question": "Kerberos cấp vé xác thực gọi là ________.",
    "options": [],
    "answer": "ticket",
    "explanation": "Kerberos dùng ticket.",
    "tags": []
  },
  {
    "id": "Q128",
    "type": "fill",
    "lesson": "Bài 7",
    "topic": "SSID",
    "difficulty": 1,
    "question": "Tên logic của mạng Wi-Fi gọi là ________.",
    "options": [],
    "answer": "SSID",
    "explanation": "Service Set Identifier.",
    "tags": []
  },
  {
    "id": "Q129",
    "type": "fill",
    "lesson": "Bài 7",
    "topic": "WPA2",
    "difficulty": 2,
    "question": "WPA2 mạnh phổ biến nhờ dùng AES-________.",
    "options": [],
    "answer": "CCMP",
    "explanation": "WPA2 dùng AES-CCMP.",
    "tags": []
  },
  {
    "id": "Q130",
    "type": "fill",
    "lesson": "Bài 8",
    "topic": "Firewall",
    "difficulty": 2,
    "question": "Tập luật lọc gói thường gọi là ________.",
    "options": [],
    "answer": "ACL",
    "explanation": "Access Control List.",
    "tags": []
  },
  {
    "id": "Q131",
    "type": "fill",
    "lesson": "Bài 8",
    "topic": "DMZ",
    "difficulty": 2,
    "question": "Vùng đặt server public tách khỏi internal network thường gọi là ________.",
    "options": [],
    "answer": "DMZ",
    "explanation": "Demilitarized Zone.",
    "tags": []
  },
  {
    "id": "Q132",
    "type": "fill",
    "lesson": "Bài 8",
    "topic": "Stateful",
    "difficulty": 2,
    "question": "Bảng lưu trạng thái kết nối trong stateful firewall gọi là ________.",
    "options": [],
    "answer": "state table",
    "explanation": "State table lưu phiên.",
    "tags": []
  },
  {
    "id": "Q133",
    "type": "short",
    "lesson": "Bài 1",
    "topic": "MITM",
    "difficulty": 3,
    "question": "Giải thích ngắn vì sao mã hóa mà không xác thực vẫn có thể bị MITM.",
    "options": [],
    "answer": "Vì attacker có thể đứng giữa và thay khóa/giả mạo endpoint; cần xác thực danh tính/chứng chỉ hoặc MAC/chữ ký để biết đang nói chuyện với đúng bên.",
    "explanation": "Mã hóa bảo mật nội dung, nhưng xác thực mới chống giả mạo endpoint.",
    "tags": []
  },
  {
    "id": "Q134",
    "type": "short",
    "lesson": "Bài 1",
    "topic": "DoS",
    "difficulty": 2,
    "question": "Phân biệt ngắn DoS và DDoS.",
    "options": [],
    "answer": "DoS thường từ một nguồn; DDoS dùng nhiều nguồn/botnet phân tán cùng làm cạn tài nguyên nạn nhân.",
    "explanation": "Keyword: distributed.",
    "tags": []
  },
  {
    "id": "Q135",
    "type": "short",
    "lesson": "Bài 2a",
    "topic": "Trojan prevention",
    "difficulty": 2,
    "question": "Nêu 3 dấu hiệu/cách kiểm tra máy nghi nhiễm Trojan.",
    "options": [],
    "answer": "Xem port mở bằng Netstat/TCPView; kiểm tra process lạ; kiểm tra startup/registry; bắt gói bằng Wireshark; quét bằng anti-malware.",
    "explanation": "Có thể trả lời 3 trong các ý này.",
    "tags": []
  },
  {
    "id": "Q136",
    "type": "short",
    "lesson": "Bài 2b",
    "topic": "Virus vs worm",
    "difficulty": 2,
    "question": "So sánh virus và worm trong 2 câu.",
    "options": [],
    "answer": "Virus thường cần bám vào file/chương trình chủ và chạy khi host được thực thi. Worm là chương trình độc lập, có thể tự lan qua mạng.",
    "explanation": "Chốt: host vs stand-alone.",
    "tags": []
  },
  {
    "id": "Q137",
    "type": "short",
    "lesson": "Bài 3",
    "topic": "ECB vs CBC",
    "difficulty": 3,
    "question": "Tại sao ECB không nên dùng cho dữ liệu có mẫu lặp?",
    "options": [],
    "answer": "ECB mã hóa cùng plaintext block thành cùng ciphertext block nên lộ pattern. CBC dùng IV và chaining làm các block giống nhau cho ciphertext khác nhau.",
    "explanation": "Câu vận dụng mode mã khối.",
    "tags": []
  },
  {
    "id": "Q138",
    "type": "short",
    "lesson": "Bài 3",
    "topic": "Playfair",
    "difficulty": 2,
    "question": "Nêu 3 luật mã hóa Playfair cơ bản.",
    "options": [],
    "answer": "Cùng hàng dịch phải; cùng cột dịch xuống; khác hàng/cột lấy hai góc còn lại của hình chữ nhật. Nếu trùng chữ trong cặp thì chèn X, nếu lẻ thì thêm X.",
    "explanation": "Có thể nói thêm I/J gộp.",
    "tags": []
  },
  {
    "id": "Q139",
    "type": "short",
    "lesson": "Bài 4",
    "topic": "RSA",
    "difficulty": 3,
    "question": "Vì sao RSA cần p và q rất lớn?",
    "options": [],
    "answer": "Vì an toàn RSA dựa vào việc khó phân tích n=pq thành p và q; nếu p,q nhỏ thì tìm phi(n) và d rất dễ.",
    "explanation": "Keyword: factorization.",
    "tags": []
  },
  {
    "id": "Q140",
    "type": "short",
    "lesson": "Bài 4",
    "topic": "DH MITM",
    "difficulty": 3,
    "question": "Diffie-Hellman thuần túy thiếu xác thực sẽ gặp rủi ro gì?",
    "options": [],
    "answer": "Bị MITM: attacker thiết lập hai khóa riêng với hai bên, mỗi bên tưởng đang chia sẻ khóa với nhau.",
    "explanation": "DH cần chứng thực/chữ ký/certificate để chống MITM.",
    "tags": []
  },
  {
    "id": "Q141",
    "type": "short",
    "lesson": "Bài 5",
    "topic": "MAC vs signature",
    "difficulty": 3,
    "question": "MAC và chữ ký số khác nhau ở điểm nào về khóa và không thể từ chối?",
    "options": [],
    "answer": "MAC dùng khóa bí mật chia sẻ nên hai bên đều có thể tạo MAC, không hỗ trợ không thể từ chối mạnh. Chữ ký số dùng private key riêng của người ký, public key xác minh nên hỗ trợ non-repudiation.",
    "explanation": "Câu hay gài giữa authentication và non-repudiation.",
    "tags": []
  },
  {
    "id": "Q142",
    "type": "short",
    "lesson": "Bài 5",
    "topic": "Hash collision",
    "difficulty": 2,
    "question": "Đụng độ hash là gì?",
    "options": [],
    "answer": "Hai thông điệp khác nhau tạo ra cùng giá trị băm.",
    "explanation": "Collision resistance là tiêu chí quan trọng.",
    "tags": []
  },
  {
    "id": "Q143",
    "type": "short",
    "lesson": "Bài 6",
    "topic": "AH vs ESP",
    "difficulty": 3,
    "question": "So sánh AH và ESP trong IPsec.",
    "options": [],
    "answer": "AH chủ yếu xác thực nguồn và toàn vẹn gói IP, không mã hóa payload. ESP bảo vệ payload và có thể mã hóa, đồng thời có thể xác thực.",
    "explanation": "Nói đúng trọng tâm là đủ.",
    "tags": []
  },
  {
    "id": "Q144",
    "type": "short",
    "lesson": "Bài 6",
    "topic": "Transport vs tunnel",
    "difficulty": 3,
    "question": "Phân biệt IPsec transport mode và tunnel mode.",
    "options": [],
    "answer": "Transport mode bảo vệ payload của gói IP gốc giữa hai host; tunnel mode bọc toàn bộ gói IP gốc trong gói IP mới, thường dùng site-to-site gateway.",
    "explanation": "Keyword: host-to-host vs gateway-to-gateway.",
    "tags": []
  },
  {
    "id": "Q145",
    "type": "short",
    "lesson": "Bài 6",
    "topic": "TLS handshake",
    "difficulty": 2,
    "question": "TLS handshake dùng để làm gì?",
    "options": [],
    "answer": "Để client/server thỏa thuận phiên bản, bộ mã, xác thực server/client nếu có, trao đổi khóa và tạo khóa phiên cho kênh bảo mật.",
    "explanation": "Không cần mô tả từng packet quá sâu.",
    "tags": []
  },
  {
    "id": "Q146",
    "type": "short",
    "lesson": "Bài 7",
    "topic": "WEP weakness",
    "difficulty": 2,
    "question": "Nêu vì sao WEP bị xem là yếu.",
    "options": [],
    "answer": "WEP dùng RC4 với IV ngắn/tái sử dụng, quản lý khóa kém nên attacker bắt đủ gói có thể suy ra khóa.",
    "explanation": "Keyword: IV/RC4.",
    "tags": []
  },
  {
    "id": "Q147",
    "type": "short",
    "lesson": "Bài 7",
    "topic": "Evil twin",
    "difficulty": 2,
    "question": "Evil Twin AP là gì?",
    "options": [],
    "answer": "Là access point giả mạo tên giống mạng thật để dụ client kết nối, từ đó nghe lén/MITM/đánh cắp thông tin.",
    "explanation": "Câu ứng dụng Wi-Fi.",
    "tags": []
  },
  {
    "id": "Q148",
    "type": "short",
    "lesson": "Bài 8",
    "topic": "Stateful vs stateless",
    "difficulty": 2,
    "question": "So sánh stateless và stateful packet filtering.",
    "options": [],
    "answer": "Stateless xét từng gói độc lập theo ACL. Stateful lưu trạng thái kết nối trong state table nên biết gói thuộc phiên hợp lệ hay không.",
    "explanation": "Chốt: có nhớ trạng thái hay không.",
    "tags": []
  },
  {
    "id": "Q149",
    "type": "short",
    "lesson": "Bài 8",
    "topic": "DMZ",
    "difficulty": 2,
    "question": "Vì sao server public nên đặt trong DMZ?",
    "options": [],
    "answer": "Để người ngoài truy cập dịch vụ public nhưng nếu server bị compromise thì vẫn có lớp ngăn cách với mạng nội bộ.",
    "explanation": "DMZ là vùng đệm.",
    "tags": []
  },
  {
    "id": "Q150",
    "type": "short",
    "lesson": "Bài 8",
    "topic": "Proxy",
    "difficulty": 2,
    "question": "Application gateway/proxy khác packet filter ở đâu?",
    "options": [],
    "answer": "Proxy hiểu giao thức tầng ứng dụng và kiểm tra payload/định dạng nội dung; packet filter chủ yếu dựa vào IP/port/header.",
    "explanation": "Keyword: payload/application layer.",
    "tags": []
  },
  {
    "id": "Q151",
    "type": "short",
    "lesson": "Tổng hợp",
    "topic": "Exam strategy",
    "difficulty": 3,
    "question": "Khi gặp câu hỏi “không thể từ chối”, nên ưu tiên nghĩ đến cơ chế nào và vì sao?",
    "options": [],
    "answer": "Ưu tiên chữ ký số vì chỉ private key của người ký tạo được chữ ký, public key kiểm tra được, nên người gửi khó phủ nhận.",
    "explanation": "Keyword: non-repudiation = digital signature.",
    "tags": []
  },
  {
    "id": "Q152",
    "type": "short",
    "lesson": "Tổng hợp",
    "topic": "Exam strategy",
    "difficulty": 3,
    "question": "Khi câu hỏi có từ khóa “port nguồn/port đích/IP header/TCP header/ACL” thì thường chốt về gì?",
    "options": [],
    "answer": "Packet filtering/firewall, đặc biệt stateless nếu nói từng gói độc lập và stateful nếu nói bảng trạng thái kết nối.",
    "explanation": "Đây là thần chú nhận diện dạng đề.",
    "tags": []
  },
  {
    "id": "Q153",
    "type": "match",
    "lesson": "Bài 1",
    "topic": "Tấn công phổ biến",
    "difficulty": 2,
    "question": "Ghép kỹ thuật tấn công với mô tả phù hợp.",
    "options": [],
    "answer": [
      [
        "Eavesdropping",
        "Nghe lén/bắt gói tin"
      ],
      [
        "Replay",
        "Gửi lại thông điệp/ticket cũ"
      ],
      [
        "Buffer overflow",
        "Ghi vượt bộ đệm"
      ],
      [
        "DDoS",
        "Nhiều nguồn làm cạn tài nguyên"
      ]
    ],
    "explanation": "Ghép theo định nghĩa/chức năng đặc trưng của từng thuật ngữ.",
    "tags": []
  },
  {
    "id": "Q154",
    "type": "match",
    "lesson": "Bài 2a",
    "topic": "Trojan types",
    "difficulty": 2,
    "question": "Ghép loại Trojan với chức năng.",
    "options": [],
    "answer": [
      [
        "RAT",
        "Điều khiển từ xa"
      ],
      [
        "Keylogger",
        "Ghi phím"
      ],
      [
        "FTP Trojan",
        "Mở dịch vụ/cổng FTP"
      ],
      [
        "Destructive Trojan",
        "Phá hoại dữ liệu/hệ thống"
      ]
    ],
    "explanation": "Ghép theo định nghĩa/chức năng đặc trưng của từng thuật ngữ.",
    "tags": []
  },
  {
    "id": "Q155",
    "type": "match",
    "lesson": "Bài 3",
    "topic": "Mật mã cổ điển",
    "difficulty": 2,
    "question": "Ghép thuật toán với đặc điểm.",
    "options": [],
    "answer": [
      [
        "Caesar",
        "Dịch chuyển cố định"
      ],
      [
        "Vigenère",
        "Khóa lặp nhiều bảng"
      ],
      [
        "Playfair",
        "Mã hóa theo cặp ký tự"
      ],
      [
        "Hill",
        "Ma trận tuyến tính mod 26"
      ]
    ],
    "explanation": "Ghép theo định nghĩa/chức năng đặc trưng của từng thuật ngữ.",
    "tags": []
  },
  {
    "id": "Q156",
    "type": "match",
    "lesson": "Bài 3",
    "topic": "AES",
    "difficulty": 2,
    "question": "Ghép bước AES với ý nghĩa.",
    "options": [],
    "answer": [
      [
        "SubBytes",
        "Thay byte bằng S-box"
      ],
      [
        "ShiftRows",
        "Dịch vòng các hàng"
      ],
      [
        "MixColumns",
        "Trộn tuyến tính từng cột"
      ],
      [
        "AddRoundKey",
        "XOR với khóa vòng"
      ]
    ],
    "explanation": "Ghép theo định nghĩa/chức năng đặc trưng của từng thuật ngữ.",
    "tags": []
  },
  {
    "id": "Q157",
    "type": "match",
    "lesson": "Bài 4",
    "topic": "Public-key",
    "difficulty": 2,
    "question": "Ghép khái niệm với ý nghĩa.",
    "options": [],
    "answer": [
      [
        "Public key",
        "Công bố cho người khác dùng"
      ],
      [
        "Private key",
        "Giữ bí mật"
      ],
      [
        "RSA n",
        "Tích p và q"
      ],
      [
        "Diffie-Hellman",
        "Tạo khóa chung qua kênh công khai"
      ]
    ],
    "explanation": "Ghép theo định nghĩa/chức năng đặc trưng của từng thuật ngữ.",
    "tags": []
  },
  {
    "id": "Q158",
    "type": "match",
    "lesson": "Bài 5",
    "topic": "Chứng thực",
    "difficulty": 2,
    "question": "Ghép cơ chế với chức năng.",
    "options": [],
    "answer": [
      [
        "Hash",
        "Dấu vân tay dữ liệu không khóa"
      ],
      [
        "MAC",
        "Chứng thực bằng khóa bí mật"
      ],
      [
        "HMAC",
        "MAC dựa trên hash"
      ],
      [
        "Digital signature",
        "Ký bằng private key"
      ]
    ],
    "explanation": "Ghép theo định nghĩa/chức năng đặc trưng của từng thuật ngữ.",
    "tags": []
  },
  {
    "id": "Q159",
    "type": "match",
    "lesson": "Bài 6",
    "topic": "Giao thức",
    "difficulty": 2,
    "question": "Ghép giao thức với tầng/công dụng.",
    "options": [],
    "answer": [
      [
        "IPsec",
        "Bảo vệ gói IP/VPN"
      ],
      [
        "TLS",
        "Bảo vệ kết nối web/transport"
      ],
      [
        "S/MIME",
        "Bảo mật email"
      ],
      [
        "Kerberos",
        "Xác thực ticket trong mạng"
      ]
    ],
    "explanation": "Ghép theo định nghĩa/chức năng đặc trưng của từng thuật ngữ.",
    "tags": []
  },
  {
    "id": "Q160",
    "type": "match",
    "lesson": "Bài 8",
    "topic": "Firewall",
    "difficulty": 2,
    "question": "Ghép cấu hình/thành phần với mô tả.",
    "options": [],
    "answer": [
      [
        "Packet filter",
        "Lọc theo header/ACL"
      ],
      [
        "Application gateway",
        "Proxy kiểm tra payload"
      ],
      [
        "Bastion host",
        "Máy hardening mạnh"
      ],
      [
        "DMZ",
        "Vùng đặt server public"
      ]
    ],
    "explanation": "Ghép theo định nghĩa/chức năng đặc trưng của từng thuật ngữ.",
    "tags": []
  }
];

const THEORY_CARDS = [
  {
    "lesson": "Bài 1",
    "title": "Tổng quan an toàn mạng",
    "points": [
      "Dữ liệu có trạng thái truyền và lưu trữ; yêu cầu: bí mật, toàn vẹn, không thể từ chối, sẵn sàng.",
      "Tấn công hay gặp: eavesdropping, cryptanalysis, password pilfering, identity spoofing, buffer overflow, DoS/DDoS, malware.",
      "Keyword: nghe lén -> mã hóa; mạo nhận -> authentication; không thể từ chối -> chữ ký số."
    ]
  },
  {
    "lesson": "Bài 2a",
    "title": "Trojan và Backdoor",
    "points": [
      "Trojan thường ngụy trang/chạy ngầm, không tự nhân bản như virus/worm.",
      "RAT điều khiển từ xa; keylogger ghi phím; FTP Trojan mở cổng 21; Back Orifice gắn với 31337.",
      "Kiểm tra bằng Netstat/TCPView, process viewer, registry/startup, Wireshark, anti-malware."
    ]
  },
  {
    "lesson": "Bài 2b",
    "title": "Virus máy tính",
    "points": [
      "Virus bám đối tượng chủ, được thực thi rồi lây nhiễm và phá hoại/do thám.",
      "Kỹ thuật: lây nhiễm, thường trú, mã hóa, ngụy trang, đa hình, biến hình, chống mô phỏng.",
      "Heuristic phát hiện theo hành vi/mẫu đáng ngờ, không chỉ signature."
    ]
  },
  {
    "lesson": "Bài 3",
    "title": "Mã hóa dữ liệu",
    "points": [
      "Cổ điển: Caesar, monoalphabetic, permutation, Vigenère, OTP, affine, Playfair, Hill.",
      "DES: block 64 bit, key hiệu dụng 56 bit; AES: block 128 bit, key 128/192/256 bit.",
      "AES keyword: SubBytes, ShiftRows, MixColumns, AddRoundKey."
    ]
  },
  {
    "lesson": "Bài 4",
    "title": "Khóa công khai và quản lý khóa",
    "points": [
      "Public-key dựa trên hàm một chiều: dễ tính, khó đảo nếu thiếu bí mật.",
      "RSA: n=pq, phi=(p-1)(q-1), C=M^e mod n, M=C^d mod n.",
      "Diffie-Hellman tạo shared secret qua kênh công khai, dựa trên logarit rời rạc."
    ]
  },
  {
    "lesson": "Bài 5",
    "title": "Chứng thực dữ liệu",
    "points": [
      "Authentication xác nhận nguồn gốc và dữ liệu không bị sửa.",
      "MAC dùng khóa bí mật chung; hash/digest không dùng khóa; HMAC là keyed-hash.",
      "Chữ ký số: băm thông điệp rồi ký digest bằng private key, xác minh bằng public key."
    ]
  },
  {
    "lesson": "Bài 6",
    "title": "Giao thức bảo mật mạng",
    "points": [
      "IPsec ở tầng mạng: AH xác thực/toàn vẹn, ESP mã hóa/chứng thực, IKE trao đổi khóa.",
      "TLS/SSL ở tầng vận chuyển; PGP/S/MIME cho email; Kerberos dùng ticket/KDC; SSH thay Telnet an toàn.",
      "PKI/X.509 gồm end entity, CA, RA, repository; certificate chứa public key, issuer, validity, subject."
    ]
  },
  {
    "lesson": "Bài 7",
    "title": "Bảo mật mạng không dây",
    "points": [
      "SSID là tên mạng Wi-Fi; WEP yếu do IV/RC4; WPA2 dùng AES-CCMP.",
      "Tấn công: deauth, evil twin, rogue AP, sniffing, cracking handshake, Bluetooth attacks.",
      "Phòng thủ: WPA2/WPA3, passphrase mạnh, tắt WPS, cập nhật firmware, phân tách guest/VLAN."
    ]
  },
  {
    "lesson": "Bài 8",
    "title": "Bảo mật mạng ngoại vi",
    "points": [
      "Firewall kiểm soát giữa mạng tin cậy và không tin cậy theo least privilege.",
      "Packet filter lọc header/ACL; stateless không nhớ phiên; stateful lưu state table.",
      "Proxy/application gateway kiểm tra payload; bastion host hardening; DMZ đặt server public; NAT dịch địa chỉ."
    ]
  }
];

QUESTION_BANK.push(
  {
    id: "CASE-DH-01-A",
    type: "mcq",
    lesson: "Bài 4",
    topic: "Diffie-Hellman theo dữ kiện",
    difficulty: 3,
    caseId: "CASE-DH-01",
    context: "Trong giải thuật trao đổi khóa Diffie-Hellman, A và B thống nhất chọn số nguyên tố p=11 và phần tử sinh g=6. A chọn số bí mật XA=5, B chọn số bí mật XB=4.",
    question: "A sẽ gửi cho B giá trị YA là:",
    options: ["1", "3", "9", "10", "Đáp án khác"],
    answer: 3,
    explanation: "YA = g^XA mod p = 6^5 mod 11 = 10.",
    tags: ["case", "docx-like"]
  },
  {
    id: "CASE-DH-01-B",
    type: "mcq",
    lesson: "Bài 4",
    topic: "Diffie-Hellman theo dữ kiện",
    difficulty: 3,
    caseId: "CASE-DH-01",
    context: "Trong giải thuật trao đổi khóa Diffie-Hellman, A và B thống nhất chọn số nguyên tố p=11 và phần tử sinh g=6. A chọn số bí mật XA=5, B chọn số bí mật XB=4.",
    question: "B sẽ gửi cho A giá trị YB là:",
    options: ["1", "3", "9", "10", "Đáp án khác"],
    answer: 2,
    explanation: "YB = g^XB mod p = 6^4 mod 11 = 9.",
    tags: ["case", "docx-like"]
  },
  {
    id: "CASE-DH-01-C",
    type: "mcq",
    lesson: "Bài 4",
    topic: "Diffie-Hellman theo dữ kiện",
    difficulty: 3,
    caseId: "CASE-DH-01",
    context: "Trong giải thuật trao đổi khóa Diffie-Hellman, A và B thống nhất chọn số nguyên tố p=11 và phần tử sinh g=6. A chọn số bí mật XA=5, B chọn số bí mật XB=4.",
    question: "A và B sẽ tính được khóa bí mật chung là:",
    options: ["1", "3", "9", "10", "Đáp án khác"],
    answer: 0,
    explanation: "K = YB^XA mod p = 9^5 mod 11 = 1; kiểm tra lại YA^XB mod p = 10^4 mod 11 = 1.",
    tags: ["case", "docx-like"]
  },
  {
    id: "CASE-DH-02-A",
    type: "mcq",
    lesson: "Bài 4",
    topic: "Diffie-Hellman theo dữ kiện",
    difficulty: 3,
    caseId: "CASE-DH-02",
    context: "Cho Diffie-Hellman với p=23, g=5. Alice chọn a=6, Bob chọn b=15.",
    question: "Giá trị công khai A = g^a mod p của Alice là:",
    options: ["2", "8", "10", "19", "Đáp án khác"],
    answer: 1,
    explanation: "A = 5^6 mod 23 = 8.",
    tags: ["case"]
  },
  {
    id: "CASE-DH-02-B",
    type: "mcq",
    lesson: "Bài 4",
    topic: "Diffie-Hellman theo dữ kiện",
    difficulty: 3,
    caseId: "CASE-DH-02",
    context: "Cho Diffie-Hellman với p=23, g=5. Alice chọn a=6, Bob chọn b=15.",
    question: "Giá trị công khai B = g^b mod p của Bob là:",
    options: ["2", "8", "10", "19", "Đáp án khác"],
    answer: 3,
    explanation: "B = 5^15 mod 23 = 19.",
    tags: ["case"]
  },
  {
    id: "CASE-DH-02-C",
    type: "mcq",
    lesson: "Bài 4",
    topic: "Diffie-Hellman theo dữ kiện",
    difficulty: 3,
    caseId: "CASE-DH-02",
    context: "Cho Diffie-Hellman với p=23, g=5. Alice chọn a=6, Bob chọn b=15.",
    question: "Khóa chung K thu được là:",
    options: ["2", "8", "10", "19", "Đáp án khác"],
    answer: 0,
    explanation: "K = B^a mod p = 19^6 mod 23 = 2.",
    tags: ["case"]
  },
  {
    id: "CASE-RSA-01-A",
    type: "mcq",
    lesson: "Bài 4",
    topic: "RSA theo dữ kiện",
    difficulty: 3,
    caseId: "CASE-RSA-01",
    context: "Cho RSA với p=7, q=11, e=7 và bản rõ M=9.",
    question: "Giá trị n và phi(n) lần lượt là:",
    options: ["n=77, phi(n)=60", "n=18, phi(n)=77", "n=77, phi(n)=72", "n=60, phi(n)=77", "Đáp án khác"],
    answer: 0,
    explanation: "n=pq=77; phi(n)=(p-1)(q-1)=6*10=60.",
    tags: ["case"]
  },
  {
    id: "CASE-RSA-01-B",
    type: "mcq",
    lesson: "Bài 4",
    topic: "RSA theo dữ kiện",
    difficulty: 3,
    caseId: "CASE-RSA-01",
    context: "Cho RSA với p=7, q=11, e=7 và bản rõ M=9.",
    question: "Khóa bí mật d thỏa e*d = 1 mod phi(n) là:",
    options: ["7", "13", "43", "60", "Đáp án khác"],
    answer: 2,
    explanation: "Cần 7d = 1 mod 60. Vì 7*43=301 = 1 mod 60 nên d=43.",
    tags: ["case"]
  },
  {
    id: "CASE-RSA-01-C",
    type: "mcq",
    lesson: "Bài 4",
    topic: "RSA theo dữ kiện",
    difficulty: 3,
    caseId: "CASE-RSA-01",
    context: "Cho RSA với p=7, q=11, e=7 và bản rõ M=9.",
    question: "Ciphertext C = M^e mod n là:",
    options: ["4", "9", "37", "53", "Đáp án khác"],
    answer: 2,
    explanation: "C = 9^7 mod 77 = 37.",
    tags: ["case"]
  },
  {
    id: "CASE-RSA-02-A",
    type: "mcq",
    lesson: "Bài 4",
    topic: "RSA theo dữ kiện",
    difficulty: 3,
    caseId: "CASE-RSA-02",
    context: "Cho hệ RSA nhỏ: p=11, q=17, e=7. Người gửi muốn mã hóa M=5.",
    question: "Modulo n dùng trong RSA là:",
    options: ["28", "160", "187", "257", "Đáp án khác"],
    answer: 2,
    explanation: "n=pq=11*17=187.",
    tags: ["case"]
  },
  {
    id: "CASE-RSA-02-B",
    type: "mcq",
    lesson: "Bài 4",
    topic: "RSA theo dữ kiện",
    difficulty: 3,
    caseId: "CASE-RSA-02",
    context: "Cho hệ RSA nhỏ: p=11, q=17, e=7. Người gửi muốn mã hóa M=5.",
    question: "Giá trị phi(n) là:",
    options: ["28", "160", "187", "176", "Đáp án khác"],
    answer: 1,
    explanation: "phi(n)=(11-1)(17-1)=10*16=160.",
    tags: ["case"]
  },
  {
    id: "CASE-RSA-02-C",
    type: "mcq",
    lesson: "Bài 4",
    topic: "RSA theo dữ kiện",
    difficulty: 3,
    caseId: "CASE-RSA-02",
    context: "Cho hệ RSA nhỏ: p=11, q=17, e=7. Người gửi muốn mã hóa M=5.",
    question: "Giá trị ciphertext C là:",
    options: ["5", "58", "86", "103", "Đáp án khác"],
    answer: 3,
    explanation: "C = 5^7 mod 187 = 103.",
    tags: ["case"]
  },
  {
    id: "IMG-TCP-RST-01-A",
    type: "mcq",
    lesson: "Bài 1",
    topic: "TCP RST spoofing",
    difficulty: 3,
    caseId: "IMG-TCP-RST-01",
    image: {
      src: "assets/tcp-rst-spoof.svg",
      alt: "Hình mô tả attacker gửi gói TCP RST giả mạo vào kết nối giữa A và B",
      caption: "Sử dụng hình TCP RST spoofed để trả lời các câu trong cụm này."
    },
    context: "Máy A và máy B đã thiết lập một kết nối TCP. Attacker muốn gửi một gói TCP RST giả mạo đến A để A tin rằng gói này đến từ B.",
    question: "Để gói RST giả mạo được A chấp nhận, tối thiểu attacker cần làm đúng nhóm thông số nào?",
    options: [
      "Source Port, Destination Port, Sequence Number, ACK number",
      "Source IP, Destination IP, Source Port, Destination Port, ACK number",
      "Source IP, Destination IP, Source Port, Destination Port, Sequence number",
      "Source Port, Destination Port, Time-To-Live, Fragment offset",
      "Các thông số đều có thể lấy ngẫu nhiên"
    ],
    answer: 2,
    explanation: "A kiểm tra gói thuộc đúng 4-tuple kết nối và số sequence hợp lệ. ACK không phải trường tối thiểu trong lựa chọn sát nhất ở đây.",
    tags: ["image", "case", "docx-like"]
  },
  {
    id: "IMG-TCP-RST-01-B",
    type: "mcq",
    lesson: "Bài 1",
    topic: "TCP RST spoofing",
    difficulty: 3,
    caseId: "IMG-TCP-RST-01",
    image: {
      src: "assets/tcp-rst-spoof.svg",
      alt: "Hình mô tả attacker gửi gói TCP RST giả mạo vào kết nối giữa A và B",
      caption: "Sử dụng hình TCP RST spoofed để trả lời các câu trong cụm này."
    },
    context: "Máy A và máy B đã thiết lập một kết nối TCP. Attacker muốn gửi một gói TCP RST giả mạo đến A để A tin rằng gói này đến từ B.",
    question: "Nếu gói TCP RST giả mạo được gửi thành công và A chấp nhận, chuyện gì sẽ xảy ra?",
    options: [
      "A không có bất kỳ hành động nào",
      "A sẽ lập tức khởi tạo lại kết nối TCP mới với B",
      "A sẽ lập tức đóng kết nối TCP với B",
      "A sẽ lập tức chuyển gói TCP RST này đến B",
      "A sẽ lập tức gửi gói TCP FIN đến B để đóng kết nối TCP"
    ],
    answer: 2,
    explanation: "RST là reset connection. Nếu được chấp nhận, đầu nhận hủy/đóng phiên TCP tương ứng.",
    tags: ["image", "case", "docx-like"]
  },
  {
    id: "IMG-SIGN-01-A",
    type: "mcq",
    lesson: "Bài 5",
    topic: "Chữ ký số",
    difficulty: 3,
    caseId: "IMG-SIGN-01",
    image: {
      src: "assets/digital-signature.svg",
      alt: "Hình quy trình sinh chữ ký số với các vị trí A, B, C, D",
      caption: "Quan sát sơ đồ sinh chữ ký số trong hình, các vị trí A, B, C, D được đánh dấu trên quy trình."
    },
    question: "Dựa vào sơ đồ sinh chữ ký số trong hình, thứ tự phù hợp nhất cho A, B, C, D là:",
    options: [
      "Hash value, RSA key, Signature, Certificate",
      "RSA key, Hash value, Signature, Certificate",
      "Hash value, RSA key, Certificate, Signature",
      "Certificate, Hash value, RSA key, Signature",
      "Đáp án khác"
    ],
    answer: 2,
    explanation: "Quy trình thường là băm tài liệu tạo hash value, dùng khóa RSA/private key để ký hash, cung cấp certificate và sinh/lưu signature.",
    tags: ["image", "docx-like"]
  },
  {
    id: "IMG-PGP-01-A",
    type: "mcq",
    lesson: "Bài 6",
    topic: "PGP",
    difficulty: 3,
    caseId: "IMG-PGP-01",
    image: {
      src: "assets/pgp-hybrid.svg",
      alt: "Hình sơ đồ chức năng PGP ở cuối trang đề",
      caption: "Quan sát sơ đồ PGP ở phần cuối ảnh để trả lời."
    },
    question: "Trong sơ đồ PGP, khóa phiên Ks thường được mã hóa bằng khóa nào của người nhận B?",
    options: ["PUa", "PUb", "PRa", "PRb", "Ks"],
    answer: 1,
    explanation: "PGP dùng khóa công khai của người nhận PUb để mã hóa khóa phiên, chỉ người nhận có PRb mới giải được.",
    tags: ["image", "docx-like"]
  },
  {
    id: "IMG-EXAM-STRUCT-01-A",
    type: "mcq",
    lesson: "Tổng hợp",
    topic: "Dạng đề thật",
    difficulty: 2,
    image: {
      src: "assets/answer-sheet.svg",
      alt: "Ảnh trang đầu đề thi ATMMT có bảng trả lời 40 câu",
      caption: "Trang đầu đề thi thật: 40 câu, bảng trả lời A-E."
    },
    question: "Quan sát ảnh trang đầu đề, dạng trả lời chính của đề thi là gì?",
    options: [
      "Tự luận dài không có lựa chọn",
      "Trắc nghiệm chọn một trong các phương án A-E",
      "Chỉ điền khuyết",
      "Chỉ ghép cặp",
      "Bài tập lập trình"
    ],
    answer: 1,
    explanation: "Ảnh có bảng trả lời với các cột a, b, c, d, e cho 40 câu.",
    tags: ["image", "format"]
  },
  {
    id: "CASE-PLAYFAIR-01-A",
    type: "mcq",
    lesson: "Bài 3",
    topic: "Playfair theo dữ kiện",
    difficulty: 3,
    caseId: "CASE-PLAYFAIR-01",
    context: "Dùng Playfair với khóa k='ANTOANMANGMAYTINH'. Gộp I/J, bỏ chữ trùng khi lập ma trận khóa 5x5, sau đó điền các chữ còn lại của alphabet.",
    question: "Trong ma trận khóa, ký tự ở hàng 1 cột 1 là:",
    options: ["A", "N", "T", "O", "Đáp án khác"],
    answer: 0,
    explanation: "Chuỗi khóa bắt đầu bằng A và chưa bị loại trùng, nên ô đầu tiên là A.",
    tags: ["case", "docx-like"]
  },
  {
    id: "CASE-PLAYFAIR-01-B",
    type: "mcq",
    lesson: "Bài 3",
    topic: "Playfair theo dữ kiện",
    difficulty: 3,
    caseId: "CASE-PLAYFAIR-01",
    context: "Dùng Playfair với khóa k='ANTOANMANGMAYTINH'. Gộp I/J, bỏ chữ trùng khi lập ma trận khóa 5x5, sau đó điền các chữ còn lại của alphabet.",
    question: "Sau khi bỏ chữ trùng, phần đầu của chuỗi khóa dùng để điền ma trận là:",
    options: ["ANTOAN", "ANTOMGYIH", "ANTOANMANG", "AN TOAN MANG", "Đáp án khác"],
    answer: 1,
    explanation: "Bỏ khoảng trắng và bỏ các chữ đã xuất hiện: A,N,T,O,M,G,Y,I,H...",
    tags: ["case", "docx-like"]
  },
  {
    id: "CASE-PLAYFAIR-01-C",
    type: "mcq",
    lesson: "Bài 3",
    topic: "Playfair theo dữ kiện",
    difficulty: 3,
    caseId: "CASE-PLAYFAIR-01",
    context: "Dùng Playfair với khóa k='ANTOANMANGMAYTINH'. Gộp I/J, bỏ chữ trùng khi lập ma trận khóa 5x5, sau đó điền các chữ còn lại của alphabet.",
    question: "Với Playfair, nếu hai chữ trong một cặp nằm cùng hàng thì khi mã hóa ta làm gì?",
    options: [
      "Thay bằng chữ bên phải mỗi chữ, vòng lại đầu hàng nếu cần",
      "Thay bằng chữ bên trái mỗi chữ",
      "Thay bằng chữ phía trên mỗi chữ",
      "Giữ nguyên cặp chữ",
      "Đảo ngược thứ tự hai chữ"
    ],
    answer: 0,
    explanation: "Quy tắc Playfair khi cùng hàng là dịch sang phải một ô; giải mã thì dịch trái.",
    tags: ["case"]
  },
  {
    id: "CASE-VIG-01-A",
    type: "mcq",
    lesson: "Bài 3",
    topic: "Vigenere theo dữ kiện",
    difficulty: 3,
    caseId: "CASE-VIG-01",
    context: "Sử dụng Vigenere với plaintext 'AN TOAN MANG MAY TINH' và khóa lặp 'BAOMATMANG'. Bỏ khoảng trắng, dùng A=0, B=1, ..., Z=25.",
    question: "Ký tự ciphertext đầu tiên là:",
    options: ["A", "B", "N", "O", "Đáp án khác"],
    answer: 1,
    explanation: "Plaintext đầu là A=0, khóa đầu là B=1, nên C=(0+1) mod 26 = B.",
    tags: ["case", "docx-like"]
  },
  {
    id: "CASE-VIG-01-B",
    type: "mcq",
    lesson: "Bài 3",
    topic: "Vigenere theo dữ kiện",
    difficulty: 3,
    caseId: "CASE-VIG-01",
    context: "Sử dụng Vigenere với plaintext 'AN TOAN MANG MAY TINH' và khóa lặp 'BAOMATMANG'. Bỏ khoảng trắng, dùng A=0, B=1, ..., Z=25.",
    question: "Ký tự ciphertext thứ hai là:",
    options: ["A", "N", "B", "H", "Đáp án khác"],
    answer: 1,
    explanation: "Plaintext thứ hai N=13, khóa thứ hai A=0, nên ciphertext vẫn là N.",
    tags: ["case"]
  },
  {
    id: "CASE-VIG-01-C",
    type: "mcq",
    lesson: "Bài 3",
    topic: "Vigenere theo dữ kiện",
    difficulty: 3,
    caseId: "CASE-VIG-01",
    context: "Sử dụng Vigenere với plaintext 'AN TOAN MANG MAY TINH' và khóa lặp 'BAOMATMANG'. Bỏ khoảng trắng, dùng A=0, B=1, ..., Z=25.",
    question: "Vì sao khóa Vigenere cần được lặp lại khi mã hóa chuỗi dài hơn khóa?",
    options: [
      "Để mỗi ký tự plaintext đều có một ký tự khóa tương ứng",
      "Để biến Vigenere thành RSA",
      "Để tạo chữ ký số",
      "Để loại bỏ hoàn toàn nhu cầu giải mã",
      "Để tăng độ dài block AES"
    ],
    answer: 0,
    explanation: "Vigenere cộng từng ký tự plaintext với từng ký tự khóa, nên khóa ngắn phải lặp cho đủ độ dài thông điệp.",
    tags: ["case"]
  },
  {
    id: "CASE-FIREWALL-01-A",
    type: "mcq",
    lesson: "Bài 8",
    topic: "Firewall/DMZ theo dữ kiện",
    difficulty: 3,
    caseId: "CASE-FIREWALL-01",
    context: "Một công ty có Web server và Mail server cần cho người dùng Internet truy cập. Mạng nội bộ chứa máy kế toán và cơ sở dữ liệu nhân sự cần được tách khỏi vùng public.",
    question: "Web server và Mail server nên đặt ở vùng nào?",
    options: ["Inside/Internal network", "DMZ", "Outside/Internet", "Loopback", "Đáp án khác"],
    answer: 1,
    explanation: "Server public nên đặt trong DMZ để Internet truy cập được nhưng vẫn tách khỏi mạng nội bộ.",
    tags: ["case"]
  },
  {
    id: "CASE-FIREWALL-01-B",
    type: "mcq",
    lesson: "Bài 8",
    topic: "Firewall/DMZ theo dữ kiện",
    difficulty: 3,
    caseId: "CASE-FIREWALL-01",
    context: "Một công ty có Web server và Mail server cần cho người dùng Internet truy cập. Mạng nội bộ chứa máy kế toán và cơ sở dữ liệu nhân sự cần được tách khỏi vùng public.",
    question: "Nếu một server trong DMZ bị compromise, lợi ích chính của DMZ là gì?",
    options: [
      "Tự động khôi phục dữ liệu đã mất",
      "Ngăn hoặc giảm khả năng attacker đi thẳng vào mạng nội bộ",
      "Thay thế hoàn toàn antivirus",
      "Làm tăng băng thông Internet",
      "Bỏ nhu cầu dùng firewall"
    ],
    answer: 1,
    explanation: "DMZ là vùng đệm, giúp cô lập server public khỏi internal network.",
    tags: ["case"]
  },
  {
    id: "CASE-FIREWALL-01-C",
    type: "mcq",
    lesson: "Bài 8",
    topic: "Firewall/DMZ theo dữ kiện",
    difficulty: 3,
    caseId: "CASE-FIREWALL-01",
    context: "Một công ty có Web server và Mail server cần cho người dùng Internet truy cập. Mạng nội bộ chứa máy kế toán và cơ sở dữ liệu nhân sự cần được tách khỏi vùng public.",
    question: "Nguyên tắc cấu hình rule phù hợp nhất là:",
    options: [
      "Cho phép tất cả lưu lượng vào internal network",
      "Chỉ mở dịch vụ cần thiết vào DMZ và chặn mặc định các luồng không cần thiết",
      "Tắt toàn bộ log để tăng tốc",
      "Đặt database nhân sự trực tiếp trên Internet",
      "Dùng cùng một mật khẩu cho mọi dịch vụ"
    ],
    answer: 1,
    explanation: "Firewall nên theo least privilege/default deny, chỉ mở đúng dịch vụ cần thiết.",
    tags: ["case"]
  },
  {
    id: "CASE-KERBEROS-01-A",
    type: "mcq",
    lesson: "Bài 6",
    topic: "Kerberos theo dữ kiện",
    difficulty: 3,
    caseId: "CASE-KERBEROS-01",
    context: "Trong Kerberos, người dùng muốn truy cập một dịch vụ qua KDC. Các bước gồm: yêu cầu TGT, nhận TGT, yêu cầu service ticket, trình service ticket cho server.",
    question: "Thứ tự đúng nhất là:",
    options: ["1-2-3-4", "3-2-1-4", "2-1-4-3", "4-3-2-1", "Đáp án khác"],
    answer: 0,
    explanation: "Client lấy TGT từ AS trước, sau đó dùng TGT xin service ticket từ TGS, rồi trình ticket cho server.",
    tags: ["case", "docx-like"]
  },
  {
    id: "CASE-KERBEROS-01-B",
    type: "mcq",
    lesson: "Bài 6",
    topic: "Kerberos theo dữ kiện",
    difficulty: 3,
    caseId: "CASE-KERBEROS-01",
    context: "Trong Kerberos, người dùng muốn truy cập một dịch vụ qua KDC. Các bước gồm: yêu cầu TGT, nhận TGT, yêu cầu service ticket, trình service ticket cho server.",
    question: "Thành phần nào cấp service ticket?",
    options: ["Client", "Application server", "TGS", "DNS resolver", "Đáp án khác"],
    answer: 2,
    explanation: "Ticket Granting Server cấp service ticket dựa trên TGT hợp lệ.",
    tags: ["case"]
  },
  {
    id: "CASE-KERBEROS-01-C",
    type: "mcq",
    lesson: "Bài 6",
    topic: "Kerberos theo dữ kiện",
    difficulty: 3,
    caseId: "CASE-KERBEROS-01",
    context: "Trong Kerberos, người dùng muốn truy cập một dịch vụ qua KDC. Các bước gồm: yêu cầu TGT, nhận TGT, yêu cầu service ticket, trình service ticket cho server.",
    question: "Ý nghĩa chính của ticket trong Kerberos là gì?",
    options: [
      "Chứng minh người dùng đã được KDC xác thực mà không gửi mật khẩu trực tiếp cho server dịch vụ",
      "Mã hóa vĩnh viễn toàn bộ ổ cứng",
      "Thay địa chỉ IP nguồn",
      "Tạo khóa RSA công khai",
      "Quét cổng mở trên server"
    ],
    answer: 0,
    explanation: "Kerberos dựa vào ticket và khóa phiên để xác thực, tránh gửi mật khẩu cho từng dịch vụ.",
    tags: ["case"]
  },
  {
    id: "IMG-PAGE-02-A",
    type: "mcq",
    lesson: "Tổng hợp",
    topic: "Nhìn ảnh đề",
    difficulty: 2,
    image: {
      src: "assets/digital-signature.svg",
      alt: "Sơ đồ tự tạo về quy trình chữ ký số",
      caption: "Sơ đồ tự tạo mô phỏng quy trình tạo và kiểm tra chữ ký số."
    },
    question: "Quan sát sơ đồ, chữ ký số S được tạo bằng cách nào?",
    options: [
      "Băm tài liệu rồi ký giá trị băm bằng khóa riêng của người gửi",
      "Mã hóa toàn bộ tài liệu bằng khóa công khai của người nhận",
      "Nén tài liệu rồi gửi kèm mật khẩu",
      "Đổi địa chỉ IP nguồn của gói tin",
      "Tạo bảng ACL trên firewall"
    ],
    answer: 0,
    explanation: "Chữ ký số thường ký digest/hash của thông điệp bằng private key của người gửi.",
    tags: ["image"]
  },
  {
    id: "IMG-PAGE-03-A",
    type: "mcq",
    lesson: "Bài 8",
    topic: "ACL",
    difficulty: 3,
    image: {
      src: "assets/acl-firewall.svg",
      alt: "Sơ đồ tự tạo về firewall ACL, DMZ và internal network",
      caption: "Sơ đồ tự tạo mô phỏng firewall lọc ACL giữa Internet, DMZ và mạng nội bộ."
    },
    question: "Phát biểu nào SAI về ACL theo kiểu đề trong ảnh?",
    options: [
      "ACL cơ bản nên đặt gần nguồn nhất, ACL mở rộng nên đặt gần đích nhất",
      "Chỉ được có một ACL cho một giao thức trên mỗi chiều của một cổng",
      "Các câu lệnh ACL được kiểm tra tuần tự từ trên xuống",
      "Nếu không khớp rule cho phép thì gói có thể bị chặn bởi implicit deny",
      "ACL dùng để lọc lưu lượng theo điều kiện quản trị viên đặt ra"
    ],
    answer: 0,
    explanation: "Nguyên tắc thường gặp: standard/basic ACL đặt gần đích, extended ACL đặt gần nguồn để chặn sớm đúng lưu lượng.",
    tags: ["image", "docx-like"]
  }
);
